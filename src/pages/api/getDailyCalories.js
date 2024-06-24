import dbConnect from '../../utils/dbConnect';

export default async function handler(req, res) {
  const { userId } = req.query;

  try {
   
  const client = await dbConnect();
  const db = client.db('User');
  const collection = db.collection('dailyCalories');

    const data = await collection.find({ userId }).toArray();
    console.log(data); 

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
