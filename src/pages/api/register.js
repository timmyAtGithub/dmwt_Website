import dbConnect from '../../utils/dbConnect';
import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';
import crypto from 'crypto';

function hashEmail(email) {
  return crypto.createHash('sha256').update(email).digest('hex');
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    try {
      const client = await dbConnect();
      const db = client.db('User');

      const normalizedEmail = email.trim().toLowerCase();
      const hashedEmail = hashEmail(normalizedEmail);

      const userLoginCollection = db.collection('userLogin');
      const existingUser = await userLoginCollection.findOne({ email: hashedEmail });

      if (existingUser) {
        return res.status(400).json({ error: 'Email is already registered' });
      }

      const userId = new ObjectId();
      
      const userCollection = db.collection('users');
      const newUser = { userid: userId, name };
      await userCollection.insertOne(newUser);

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUserLogin = {
        email: hashedEmail,
        password: hashedPassword,
        userid: userId
      };
      await userLoginCollection.insertOne(newUserLogin);

      res.status(201).json({ message: 'User registered' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
