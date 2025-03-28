import dbConnect from '../../utils/dbConnect';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { serialize } from 'cookie';
import { addSessionToken } from '../../utils/addSessionToken';

function hashEmail(email) {
  return crypto.createHash('sha256').update(email).digest('hex');
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
     
      const client = await dbConnect();
    

      const db = client.db('User');
     

      const normalizedEmail = email.trim().toLowerCase();
      const hashedEmail = hashEmail(normalizedEmail);

      const userLoginCollection = db.collection('userLogin');
   
      const userLogin = await userLoginCollection.findOne({ email: hashedEmail });
      if (!userLogin) {
       
        return res.status(400).json({ error: 'Invalid email or password' });
      }

      const validPassword = await bcrypt.compare(password, userLogin.password);
      if (!validPassword) {
       
        return res.status(400).json({ error: 'Invalid email or password' });
      }

      const usersCollection = db.collection('users');
      const user = await usersCollection.findOne({ userId: userLogin.userId });
      if (!user) {
        
        return res.status(400).json({ error: 'User not found' });
      }

      const sessionToken = crypto.randomBytes(64).toString('hex');
      await addSessionToken(sessionToken, userLogin.userId);

      res.setHeader('Set-Cookie', serialize('sessionToken', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'strict',
        path: '/',
      }));


      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
