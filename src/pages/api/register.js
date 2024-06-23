import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, vorname, nachname } = req.body;

    try {
      await client.connect();
      const database = client.db('User');
      const userLoginCollection = database.collection('userLogin');
      const usersCollection = database.collection('users');
      const caloriesEatenCollection = database.collection('caloriesEaten'); // Define the caloriesEaten collection

      const hashedPassword = await bcrypt.hash(password, 10);
      const hashedEmail = crypto.createHash('sha256').update(email).digest('hex');

      // Create new userLogin entry without userId
      const newUserLogin = {
        email: hashedEmail,
        password: hashedPassword,
      };

      // Insert the new userLogin and get the insertedId
      const resultUserLogin = await userLoginCollection.insertOne(newUserLogin);
      const userId = resultUserLogin.insertedId.toString(); // Convert to string

      // Update newUserLogin with userId as a string
      await userLoginCollection.updateOne(
        { _id: resultUserLogin.insertedId },
        { $set: { userId: userId } }
      );

      // Create new users entry
      const newUser = {
        vorname,
        nachname,
        userId: userId, // Store userId as a string
      };
      await usersCollection.insertOne(newUser);

      // Create new caloriesEaten entry
      const caloriesEat = {
        userId: userId, // Store userId as a string
        calories: 0,
        carbs: 0,
        fat: 0,
        protein: 0,
      };
      await caloriesEatenCollection.insertOne(caloriesEat);

      res.status(201).json({ userId });
    } catch (error) {
      console.error('Error connecting to the database:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

export default handler;
