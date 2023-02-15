declare global {
  namespace NodeJS {
    interface ProcessEnv extends IpRegistryEnv, MailChimpEnv {
      MONGODB_URL: string;
      NODE_ENV: 'development' | 'production';
      BASE_URL: string;
    }
  }
}

interface IpRegistryEnv {
  IP_REGISTRY_API_KEY: string;
}

interface MailChimpEnv {
  MAILCHIMP_AUDIENCE_ID: string;
  MAILCHIMP_API_KEY: string;
}

export {};
