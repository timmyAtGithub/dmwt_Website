import dbConnect from '../../utils/dbConnect';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const client = await dbConnect();
      const db = client.db('Sport'); 
      const exercisesCollection = db.collection('exercises');

      const exercises = await exercisesCollection.find({}).toArray();

      res.status(200).json(exercises);
    } catch (error) {
      console.error('Error fetching exercises:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
