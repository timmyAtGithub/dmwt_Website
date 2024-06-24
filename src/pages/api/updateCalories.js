import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, calories, protein, fat, carbs } = req.body;

    try {
      await client.connect();
      const database = client.db('User');
      const caloriesCollection = database.collection('calories');

      await caloriesCollection.updateOne(
        { userId: userId },
        {
          $set: {
            calories,
            protein,
            fat,
            carbs,
          },
        },
        { upsert: true }
      );

      res.status(200).json({ message: 'Kalorienwerte erfolgreich aktualisiert' });
    } catch (error) {
      console.error('Fehler beim Aktualisieren der Kalorienwerte:', error);
      res.status(500).json({ error: 'Interner Serverfehler' });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ error: 'Methode nicht erlaubt' });
  }
}

export default handler;
