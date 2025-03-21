import dbConnect from '../../utils/dbConnect';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  
  await dbConnect();

  const { method } = req;
  const { userId, dishId } = req.query;

  

  if (!userId || !dishId) {
   
    return res.status(400).json({ success: false, error: 'Missing userId or dishId' });
  }

  try {
    const client = await dbConnect();
    const db = client.db('User');
    const favsCollection = db.collection('favs');

    if (method === 'POST') {
      const existingFav = await favsCollection.findOne({ userId, dishId });
      if (existingFav) {
      
       
        await favsCollection.deleteOne({ userId, dishId });
      } else {
       
        
        await favsCollection.insertOne({ userId, dishId });
      }

     
      const updatedFavorites = await favsCollection.find({ userId }).toArray();
      const favoriteDishIds = updatedFavorites.map(fav => fav.dishId);

      res.status(200).json({ success: true, favorites: favoriteDishIds });
    } else {
      res.status(405).json({ success: false, error: `Method ${method} not allowed` });
    }
  } catch (error) {
    console.error('Error toggling favorite:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}
