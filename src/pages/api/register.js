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

      const hashedPassword = await bcrypt.hash(password, 10);
      const hashedEmail = crypto.createHash('sha256').update(email).digest('hex');

      // Create new userLogin entry
      const newUserLogin = {
        email: hashedEmail,
        password: hashedPassword,
        userId
      };
      const resultUserLogin = await userLoginCollection.insertOne(newUserLogin);
      const userId = resultUserLogin.insertedId;

      // Create new users entry
      const newUser = {
        vorname,
        nachname,
        userId,
      };
      await usersCollection.insertOne(newUser);

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
