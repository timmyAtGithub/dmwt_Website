import dbConnect from '../../utils/dbConnect';

async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, calories, protein, fat, carbs } = req.body;

    try {
      const client = await dbConnect();
      const database = client.db('User');
      const caloriesCollection = database.collection('calories');

      const result = await caloriesCollection.updateOne(
        { userId },
        {
          $set: {
            calories: parseFloat(calories),
            protein: parseFloat(protein),
            fat: parseFloat(fat),
            carbs: parseFloat(carbs),
          },
        },
        { upsert: true }
      );

      console.log('Update result:', result);

      if (result.acknowledged) {
        res.status(200).json({ message: 'Kalorienwerte erfolgreich aktualisiert' });
      } else {
        res.status(500).json({ error: 'Fehler beim Aktualisieren der Kalorienwerte' });
      }
    } catch (error) {
      console.error('Fehler beim Aktualisieren der Kalorienwerte:', error);
      res.status(500).json({ error: 'Fehler beim Aktualisieren der Kalorienwerte' });
    }
  } else {
    res.status(405).json({ error: 'Methode nicht erlaubt' });
  }
}

export default handler;
