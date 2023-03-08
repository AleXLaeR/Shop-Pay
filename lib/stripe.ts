import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe';

export default loadStripe(process.env.STRIPE_PUBLIC_KEY);

export const { checkout } = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

export interface StripeSessionMetadata extends Stripe.Metadata {
  images: string;
  email: string;
}

export type StripeSession = Stripe.Checkout.Session;
