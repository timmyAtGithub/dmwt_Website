import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, calories, protein, fat, carbs } = req.body;

    try {
      await client.connect();
      const database = client.db('User');
      const caloriesEatenCollection = database.collection('calories');

      const caloriesEatenData = {
        userId,
        calories,
        protein,
        fat,
        carbs,
      };

      await caloriesEatenCollection.updateOne(
        { userId },
        { $set: caloriesEatenData },
        { upsert: true }
      );

      res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
      console.error('Error connecting to the database:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

export default handler;
