import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function testAuth() {
  // Test admin credentials
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'admin@example.com',
    password: 'securepassword'
  });

  if (error) {
    console.error('Admin auth failed:', error.message);
    return;
  }
  
  console.log('Admin auth successful. Testing RLS policies...');

  // Test regular user credentials
  const { data: userData, error: userError } = await supabase.auth.signInWithPassword({
    email: 'user@example.com',
    password: 'userpassword'
  });

  // Verify data access
  const { data: dashboardData } = await supabase
    .from('analytics_data')
    .select('*');

  console.log('Dashboard data access:', dashboardData);
}

export default testAuth();