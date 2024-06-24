import dbConnect from '../../utils/dbConnect';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  
  await dbConnect();

  const { method } = req;
  const { userId, exerciseId } = req.query;

  

  if (!userId || !exerciseId) {
   
    return res.status(400).json({ success: false, error: 'Missing userId or exerciseId' });
  }

  try {
    const client = await dbConnect();
    const db = client.db('User');
    const favsCollection = db.collection('favsS');

    if (method === 'POST') {
      const existingFav = await favsCollection.findOne({ userId, exerciseId });
      if (existingFav) {
        
       
        await favsCollection.deleteOne({ userId, exerciseId });
      } else {
       
        
        await favsCollection.insertOne({ userId, exerciseId });
      }

      
      const updatedFavorites = await favsCollection.find({ userId }).toArray();
      const favoriteExerciseId = updatedFavorites.map(fav => fav.exerciseId);

      res.status(200).json({ success: true, favorites: favoriteExerciseId });
    } else {
      res.status(405).json({ success: false, error: `Method ${method} not allowed` });
    }
  } catch (error) {
    console.error('Error toggling favorite:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}
