// @ts-nocheck
import { MongoClient } from 'mongodb';
import { global } from 'styled-jsx/css';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URL"');
}

const mongoUrl = process.env.MONGODB_URI;

let client: MongoClient;
// eslint-disable-next-line import/no-mutable-exports
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(mongoUrl);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(mongoUrl);
  clientPromise = client.connect();
}

export default clientPromise;
