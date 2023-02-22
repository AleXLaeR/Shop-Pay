import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';

import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import db from '@services/db.service';

import User from '@models/User';
import clientPromise from '@lib/mongodb';

import GoogleProvider from 'next-auth/providers/google';
import LinkedInProvider from 'next-auth/providers/linkedin';
import GitHubProvider from 'next-auth/providers/github';
import Auth0Provider from 'next-auth/providers/auth0';
import Credentials from 'next-auth/providers/credentials';

type UserCredentials = {
  readonly password: string;
  user: any;
};

async function signUserIn({ password, user }: UserCredentials) {
  if (!user.password) {
    throw new Error('Please enter your password.');
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Wrong password or e-mail; Try again.');
  }
  return user;
}

db.connectToDb();

export default NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials!;
        const user = await User.findOne({ email });

        if (user) {
          return signUserIn({ password, user });
        }
        throw new Error('No user found with that e-mail');
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_ID,
      clientSecret: process.env.LINKEDIN_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER,
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session: async ({ session, token: { sub } }) => {
      const user = await User.findById(sub);
      session.user!.id = sub || user?._id.toString();
      session.user!.role = user?.role || 'buyer';
      return session;
    },
  },
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: 'shoppay',
  }),
  secret: process.env.NEXTAUTH_SECRET,
});
