import dbConnect from '../../utils/dbConnect';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { serialize } from 'cookie';
import { addSessionToken } from '../../utils/sessionStore';

function hashEmail(email) {
  return crypto.createHash('sha256').update(email).digest('hex');
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      console.log("Connecting to database...");
      const client = await dbConnect();
      console.log("Connected to database");

      const db = client.db('User');
      console.log("Database connection established");

      const normalizedEmail = email.trim().toLowerCase();
      const hashedEmail = hashEmail(normalizedEmail);

      const userLoginCollection = db.collection('userLogin');
      console.log("Finding user...");
      const userLogin = await userLoginCollection.findOne({ email: hashedEmail });
      if (!userLogin) {
        console.log("User not found");
        return res.status(400).json({ error: 'Invalid email or password' });
      }

      console.log("Checking password...");
      const validPassword = await bcrypt.compare(password, userLogin.password);
      if (!validPassword) {
        console.log("Invalid password");
        return res.status(400).json({ error: 'Invalid email or password' });
      }

      
      const usersCollection = db.collection('users');
      const user = await usersCollection.findOne({ userid: userLogin.userid });
      if (!user) {
        console.log("User not found in users collection");
        return res.status(400).json({ error: 'User not found' });
      }

      const sessionToken = crypto.randomBytes(64).toString('hex');
      const sessionData = { token: sessionToken, name: user.name };

      
      addSessionToken(sessionToken, sessionData);

      res.setHeader('Set-Cookie', serialize('sessionToken', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, 
        sameSite: 'strict',
        path: '/',
      }));

      console.log("Cookie set:", serialize('sessionToken', sessionToken, {
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
