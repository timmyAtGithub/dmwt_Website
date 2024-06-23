import dbConnect from '../../utils/dbConnect';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    try {
      const client = await dbConnect();
      const db = client.db('User');

      // Check and reset calories if a new day has started
      const settingsCollection = db.collection('settings');
      const caloriesEatenCollection = db.collection('caloriesEaten');
      const currentDate = new Date().toISOString().split('T')[0];

      const settings = await settingsCollection.findOne({ key: 'lastResetDate' });
      if (!settings || settings.value !== currentDate) {
        await caloriesEatenCollection.updateMany(
          {},
          { $set: { calories: 0, carbs: 0, fat: 0, protein: 0 } }
        );
        await settingsCollection.updateOne(
          { key: 'lastResetDate' },
          { $set: { value: currentDate } },
          { upsert: true }
        );
      }

      // Fetch calories data
      const caloriesData = await db.collection('calories').findOne({ userId });
      const caloriesEatenData = await caloriesEatenCollection.findOne({ userId });

      console.log(caloriesData);
      console.log(caloriesEatenData);

      if (!caloriesData || !caloriesEatenData) {
        return res.status(404).json({ error: 'Data not found' });
      }

      res.status(200).json({ caloriesData, caloriesEatenData });
    } catch (error) {
      console.error('Error fetching calories info:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
