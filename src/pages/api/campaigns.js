import { getSession } from 'next-auth/react';
import axios from 'axios';

export default async function handler(req, res) {
  const session = await getSession({ req });
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const response = await axios.get(
      'https://sellingpartnerapi.amazon.com/campaigns',
      {
        headers: {
          'x-amz-access-token': session.accessToken,
          'Content-Type': 'application/json'
        }
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Failed to fetch campaigns:', error);
    res.status(500).json({ error: 'Failed to retrieve campaign data' });
  }
}