import { openDB } from 'idb';

const initDB = async (storeName: string) => {
  return openDB('edu-rise-db', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        const userStore = db.createObjectStore(storeName, {
          keyPath: 'id',
          autoIncrement: true,
        });
        userStore.createIndex('by-email', 'email', { unique: true });
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
  get: async (storeName: string, id: string) => {
    const db = await initDB(storeName);
    return db.get(storeName, id);
  },

  // Method baru (cari berdasarkan Email)
  getByEmail: async (storeName: string, email: string) => {
    const db = await initDB(storeName);
    // 'users' = nama store, 'by-email' = nama index yang dibuat di upgrade()
    return db.getFromIndex(storeName, 'by-email', email);
  },

  updateByEmail: async (
    storeName: string,
    email: string,
    data: Record<string, unknown>
  ) => {
    const db = await initDB(storeName);
    const existing = await db.getFromIndex(storeName, 'by-email', email);
    if (!existing) throw new Error('User not found');
    const updated = { ...existing, ...data };
    return db.put(storeName, updated);
  },
};
