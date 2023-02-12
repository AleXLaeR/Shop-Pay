declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URL: string;
      NODE_ENV: 'development' | 'production';
      PORT: string;
    }
  }
}

export {};
