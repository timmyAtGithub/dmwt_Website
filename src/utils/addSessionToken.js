import dbConnect from './dbConnect';

export async function addSessionToken(sessionToken, userId) {
  try {
    const client = await dbConnect();
    const database = client.db('User');
    const sessionsCollection = database.collection('sessions');

    await sessionsCollection.insertOne({
      sessionToken,
      userId,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000),
    });

    console.log("Session token added to database");
  } catch (error) {
    console.error("Error adding session token to database:", error);
    throw new Error('Could not add session token');
  }
}
