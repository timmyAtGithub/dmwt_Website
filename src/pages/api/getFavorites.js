import dbConnect from '../../utils/dbConnect';

export default async function handler(req, res) {
 
  await dbConnect();

  const { userId } = req.query;

  

  if (!userId) {
 
    return res.status(400).json({ success: false, error: 'Missing userId' });
  }

  try {
    const client = await dbConnect();
    const db = client.db('User');

    const favsCollection = db.collection('favs');

    
    const userFavorites = await favsCollection.find({ userId: userId }).toArray();
    const favoriteDishIds = await userFavorites.map(fav => fav.dishId);
 

    return res.status(200).json({ success: true, favorites: favoriteDishIds });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
