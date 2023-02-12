import mongoose, { ConnectionStates } from 'mongoose';

type DbConnection = { state: ConnectionStates };
const connection: DbConnection = { state: ConnectionStates.uninitialized };

mongoose.set('strictQuery', true);

export default async function connectToDb(): Promise<undefined> {
  if (connection.state === ConnectionStates.connected) {
    console.log('There already is a connection to the mongodb');
    return;
  }

  if (mongoose.connections.length !== 0) {
    connection.state = mongoose.connections[0].readyState;

    if (connection.state === ConnectionStates.connected) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Using previous connection to the mongodb');
      }
      return;
    }
    await mongoose.disconnect();
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    connection.state = ConnectionStates.connected;
  } catch (error: any) {
    console.log(`There was an error establishing mongodb connection: ${error}`);
  }
}

export async function disconnectFromDb() {
  if (connection.state === ConnectionStates.connected) {
    if (process.env.NODE_ENV === 'production') {
      connection.state = ConnectionStates.disconnected;
      await mongoose.disconnect();
    }
  }
}
