declare global {
  namespace NodeJS {
    interface ProcessEnv extends NextAuthEnv, IpRegistryEnv, MailChimpEnv {
      MONGODB_URI: string;
      NODE_ENV: 'development' | 'production';
      BASE_API_URL: string;
    }
  }
}

interface NextAuthEnv extends GoogleCredsEnv {
  NEXTAUTH_SECRET: string;
  NEXTAUTH_URL: string;
}

interface GoogleCredsEnv {
  GOOGLE_ID: string;
  GOOGLE_SECRET: string;
}

interface IpRegistryEnv {
  IP_REGISTRY_API_KEY: string;
}

interface MailChimpEnv {
  MAILCHIMP_AUDIENCE_ID: string;
  MAILCHIMP_API_KEY: string;
}

export {};
