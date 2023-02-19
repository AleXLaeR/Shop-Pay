declare global {
  namespace NodeJS {
    interface ProcessEnv extends NextAuthEnv, APIEnv {
      MONGODB_URI: string;
      NODE_ENV: 'development' | 'production';
    }
  }

  interface NextAuthEnv extends GoogleCredsEnv, LinkedInCredsEnv, GitHubCredsEnv {
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

interface IpRegistryEnv {
  IP_REGISTRY_API_KEY: string;
}

interface MailChimpEnv {
  MAILCHIMP_AUDIENCE_ID: string;
  MAILCHIMP_API_KEY: string;
}

export {};
