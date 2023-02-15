declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URL: string;
      NODE_ENV: 'development' | 'production';
      BASE_URL: string;
      IP_REGISTRY_API_KEY: string;
    }
  }
}

export {};
