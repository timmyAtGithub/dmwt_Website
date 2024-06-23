import dbConnect from '../../utils/dbConnect';

export default async function handler(req, res) {
  try {
    const client = await dbConnect();
    const db = client.db('User');
    const collection = db.collection('dailyCalories');

    // Beispiel-Testdaten
    const testData = [
      {
        userId: '66771bed263898b6ac2984f4',
        date: new Date('2024-06-20').toISOString().split('T')[0],
        carbs: 284,
        protein: 221,
        fat: 63,
        calories: 2521,
        maxCarbs: 1134.61453125,
        maxProtein: 882.47796875,
        maxFat: 504.273125,
        maxCalories: 2521.365625,
      },
      {
        userId: '66771bed263898b6ac2984f4',
        date: new Date('2024-06-21').toISOString().split('T')[0],
        carbs: 284,
        protein: 221,
        fat: 63,
        calories: 2521,
        maxCarbs: 1134.61453125,
        maxProtein: 882.47796875,
        maxFat: 504.273125,
        maxCalories: 2521.365625,
      },
      {
        userId: '66771bed263898b6ac2984f4',
        date: new Date('2024-06-22').toISOString().split('T')[0],
        carbs: 284,
        protein: 221,
        fat: 63,
        calories: 2521,
        maxCarbs: 1134.61453125,
        maxProtein: 882.47796875,
        maxFat: 504.273125,
        maxCalories: 2521.365625,
      },
      // Fügen Sie weitere Testdaten hinzu
    ];

    await collection.insertMany(testData);

    res.status(200).json({ message: 'Test entries added successfully' });
  } catch (error) {
    console.error('Error adding test entries:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
