import { openDB } from 'idb';

const initDB = async (storeName: string) => {
  return openDB('edu-rise-db', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        const userStore = db.createObjectStore(storeName, {
          keyPath: 'id',
          autoIncrement: true,
        });
        userStore.createIndex('by-username', 'username', { unique: true });
      }
    },
  });
};

export const dbOps = {
  getAll: async (storeName: string) => {
    const db = await initDB(storeName);
    return db.getAll(storeName);
  },
  add: async (storeName: string, data: Record<string, unknown>) => {
    const db = await initDB(storeName);
    return db.add(storeName, data);
  },
};
