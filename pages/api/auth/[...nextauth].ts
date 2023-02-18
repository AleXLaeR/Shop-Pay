import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';

import clientPromise from '@lib/mongodb';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
  session: {
    strategy: 'jwt',
  },
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: 'shoppay',
  }),
  secret: process.env.NEXTAUTH_SECRET,
});
