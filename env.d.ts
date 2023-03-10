declare global {
  namespace NodeJS {
    interface ProcessEnv extends NextAuthEnv, APIEnv, MailServiceEnv, TokenSecretsEnv, PaymentsEnv {
      MONGODB_URI: string;
      NODE_ENV: 'development' | 'production';
      BASE_URL: string;
    }
  }

  interface NextAuthEnv extends GoogleCredsEnv, LinkedInCredsEnv, GitHubCredsEnv, Auth0Creds {
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;
  }

  interface APIEnv extends IpRegistryEnv, MailChimpEnv {
    BASE_API_URL: string;
  }
}

interface GoogleCredsEnv {
  GOOGLE_ID: string;
  GOOGLE_SECRET: string;
}

interface LinkedInCredsEnv {
  LINKEDIN_ID: string;
  LINKEDIN_SECRET: string;
}

interface GitHubCredsEnv {
  GITHUB_ID: string;
  GITHUB_SECRET: string;
}

interface Auth0Creds {
  AUTH0_ISSUER: string;
  AUTH0_CLIENT_SECRET: string;
  AUTH0_CLIENT_ID: string;
}

interface TokenSecretsEnv {
  JWT_TOKEN_SECRET: string;
  RESET_TOKEN_SECRET: string;
}

interface PaymentsEnv {
  PAYPAL_CLIENT_ID: string;
  PAYPAL_CLIENT_SECRET: string;

  STRIPE_PUBLIC_KEY: string;
  STRIPE_SECRET_KEY: string;
}

interface MailServiceEnv {
  MAILING_SERVICE_REFRESH_TOKEN: string;
  SENDER_EMAIL_ADDRESS: string;
}

interface IpRegistryEnv {
  IP_REGISTRY_API_KEY: string;
}

interface MailChimpEnv {
  MAILCHIMP_AUDIENCE_ID: string;
  MAILCHIMP_API_KEY: string;
}

export {};
