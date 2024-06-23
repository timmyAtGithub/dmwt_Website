import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { userId, year } = req.query;

    if (!userId || !year) {
      return res.status(400).json({ error: 'userId and year are required' });
    }

    try {
      await client.connect();
      const database = client.db('User');
      const weightCollection = database.collection('weight');

      const weights = await weightCollection.find({
        userId,
        date: {
          $gte: new Date(`${year}-01-01`),
          $lt: new Date(`${year}-12-31`),
        },
      }).toArray();

      res.status(200).json(weights);
    } catch (error) {
      console.error('Error fetching weights:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
