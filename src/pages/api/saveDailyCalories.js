import dbConnect from '../../utils/dbConnect';

export default async function handler(req, res) {
  const { userId, carbs, protein, fat, calories, date, maxCarbs, maxProtein, maxFat, maxCalories } = req.body;

  if (
    userId == null || carbs == null || protein == null || fat == null || calories == null || date == null ||
    maxCarbs == null || maxProtein == null || maxFat == null || maxCalories == null
  ) {
    console.log('Missing required fields', { userId, carbs, protein, fat, calories, date, maxCarbs, maxProtein, maxFat, maxCalories });
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const client = await dbConnect();
    const db = client.db('User');
    const collection = db.collection('dailyCalories');

    await collection.updateOne(
      { userId, date: new Date(date).toISOString().split('T')[0] },
      { $set: { userId, carbs, protein, fat, calories, date: new Date(date).toISOString().split('T')[0], maxCarbs, maxProtein, maxFat, maxCalories } },
      { upsert: true }
    );

    res.status(200).json({ message: 'Daily calories saved' });
  } catch (error) {
    console.error('Error saving daily calories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
