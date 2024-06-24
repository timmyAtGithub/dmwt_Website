
export default async function handler(req, res) {
    res.setHeader('Set-Cookie', 'sessionToken=; Max-Age=0; Path=/; HttpOnly');
    res.status(200).json({ message: 'Logged out' });
  }
  