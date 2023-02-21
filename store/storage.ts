import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import { WebStorage } from 'redux-persist/lib/types';

export default (function createPersistStorage(): WebStorage {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    return {
      getItem: () => Promise.resolve(null),
      removeItem: () => Promise.resolve(),
      setItem: () => Promise.resolve(),
    };
  }

  return createWebStorage('local');
})();
