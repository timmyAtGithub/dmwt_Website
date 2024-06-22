// src/pages/api/meals.js
import dbConnect from '../../utils/dbConnect';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const client = await dbConnect();
      const db = client.db('Gerichte');
      const meals = await db.collection('gericht').find({}).toArray();
      res.status(200).json(meals);
    } catch (error) {
      console.error("Error fetching meals:", error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
