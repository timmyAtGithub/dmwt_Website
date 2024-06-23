import dbConnect from '../../utils/dbConnect';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { sessionToken } = req.cookies;

    if (!sessionToken) {
      return res.status(401).json({ error: 'No session token found' });
    }

    try {
      const client = await dbConnect();
      const db = client.db('User');
      const sessionsCollection = db.collection('sessions');

      const session = await sessionsCollection.findOne({ sessionToken });

      if (!session) {
        return res.status(401).json({ error: 'Invalid session token' });
      }

      const usersCollection = db.collection('users');
      const user = await usersCollection.findOne({ userId: session.userId });

      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error('Error verifying session:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
