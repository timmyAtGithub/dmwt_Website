import { parse } from 'cookie';
import { getSessionData } from '../../utils/sessionStore';

export default async function handler(req, res) {
  const { cookies } = req;
  const { sessionToken } = cookies;

  console.log("Cookies received by server:", cookies);
  console.log("Session Token:", sessionToken);

  if (!sessionToken) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const sessionData = getSessionData(sessionToken);
  if (sessionData) {
    res.status(200).json({ name: sessionData.name });
  } else {
    res.status(401).json({ error: 'Invalid session token' });
  }
}
