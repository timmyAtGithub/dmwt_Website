import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, weight, date } = req.body;

    try {
      await client.connect();
      const database = client.db('User');
      const weightCollection = database.collection('weight');

      const weightData = {
        userId,
        weight,
        date: new Date(date) // Ensure the date is stored as a Date object
      };

      await weightCollection.insertOne(weightData);

      res.status(201).json({ message: 'Weight data saved successfully' });
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
