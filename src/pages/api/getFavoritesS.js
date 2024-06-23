import dbConnect from '../../utils/dbConnect';

export default async function handler(req, res) {
  console.log('Handler called for getFavoritesS');
  await dbConnect();

  const { userId } = req.query;

  console.log('userId:', userId);

  if (!userId) {
    console.log('Missing userId');
    return res.status(400).json({ success: false, error: 'Missing userId' });
  }

  try {
    const client = await dbConnect();
    const db = client.db('User');
    console.log('Connected to database');
    const favsCollection = db.collection('favsS');
    console.log('Fetching favorites for userId:', userId);
    
    const userFavorites = await favsCollection.find({ userId: userId }).toArray();
    const favoriteExerciseId = await userFavorites.map(fav => fav.exerciseId);
    console.log('Favorites fetched:', favoriteExerciseId);

    return res.status(200).json({ success: true, favorites: favoriteExerciseId });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
