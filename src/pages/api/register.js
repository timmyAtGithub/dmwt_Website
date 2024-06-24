import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, vorname, nachname, macroData, gewicht } = req.body;

    try {
      await client.connect();
      const database = client.db('User');
      const userLoginCollection = database.collection('userLogin');
      const usersCollection = database.collection('users');
      const caloriesEatenCollection = database.collection('caloriesEaten'); 
      const weightCollection = database.collection('weight');

      const hashedPassword = await bcrypt.hash(password, 10);
      const hashedEmail = crypto.createHash('sha256').update(email).digest('hex');

     
      const newUserLogin = {
        email: hashedEmail,
        password: hashedPassword,
      };

      
      const resultUserLogin = await userLoginCollection.insertOne(newUserLogin);
      const userId = resultUserLogin.insertedId.toString(); 

     
      await userLoginCollection.updateOne(
        { _id: resultUserLogin.insertedId },
        { $set: { userId: userId } }
      );

      
      const newUser = {
        vorname,
        nachname,
        userId: userId, 
      };
      await usersCollection.insertOne(newUser);

     
      const caloriesEat = {
        userId: userId, 
        calories: 0,
        carbs: 0,
        fat: 0,
        protein: 0
      };
      await caloriesEatenCollection.insertOne(caloriesEat);

     
      const weightData = {
        userId: userId, 
        weight: gewicht,
        date: new Date().toISOString()
      };
      await weightCollection.insertOne(weightData);

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
