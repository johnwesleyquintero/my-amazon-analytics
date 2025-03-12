import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../config/supabase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const authHeader = req.headers.authorization
    
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header required' })
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(authHeader.split(' ')[1])
    
    if (authError || !user) {
      return res.status(401).json({ error: 'Invalid authentication token' })
    }

    // Verify admin role
    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single()

    if (!roleData?.role.includes('admin')) {
      return res.status(403).json({ error: 'Insufficient permissions' })
    }

    const response = await fetch(
      'https://aybridyinsrebhibkgkh.supabase.co/functions/v1/user-management',
      {
        method: req.method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader,
        },
        body: req.body ? JSON.stringify(req.body) : undefined,
      }
    )

    const data = await response.json()

    if (!response.ok) {
      return res.status(response.status).json(data)
    }

    // Audit log for admin actions
    if (req.method === 'POST' || req.method === 'DELETE') {
      const { data: user } = await supabase.auth.getUser()
      
      await supabase.from('admin_audit_logs').insert({
        user_id: user.id,
        user_email: user.email,
        action: req.method,
        endpoint: 'user-management',
        timestamp: new Date().toISOString(),
      })
    }

    res.status(response.status).json(data)
  } catch (error) {
    console.error('User management error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}