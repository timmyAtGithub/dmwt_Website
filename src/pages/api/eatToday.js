import dbConnect from '../../utils/dbConnect';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, carbs, protein, fat, calories } = req.body;

    try {
      const client = await dbConnect();
      const db = client.db('User');
      const collection = db.collection('caloriesEaten');
      console.log(userId);

      // Fetch the existing data for the user
      const existingData = await collection.findOne({ userId });

      // Ensure existingData and its properties are defined
      const existingCarbs = existingData?.carbs || 0;
      const existingProtein = existingData?.protein || 0;
      const existingFat = existingData?.fat || 0;
      const existingCalories = existingData?.calories || 0;

      // Calculate the new values by adding the existing and incoming values
      const newCarbs = existingCarbs + carbs;
      const newProtein = existingProtein + protein;
      const newFat = existingFat + fat;
      const newCalories = existingCalories + calories;

      // Update the user's calories data
      await collection.updateOne(
        { userId },
        {
          $set: {
            carbs: newCarbs,
            protein: newProtein,
            fat: newFat,
            calories: newCalories,
          },
        },
        { upsert: true }
      );

      res.status(200).json({ message: 'Calories added successfully' });
    } catch (error) {
      console.error('Error updating calories:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
