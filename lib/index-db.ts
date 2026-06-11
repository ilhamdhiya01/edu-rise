import { openDB } from 'idb';

const initDB = async (storeName?: string) => {
  return openDB('edu-rise-db', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('users')) {
        const userStore = db.createObjectStore('users', {
          keyPath: 'id',
          autoIncrement: true,
        });
        userStore.createIndex('by-email', 'email', { unique: true });
        userStore.createIndex('by-username', 'username', { unique: true });
      }

      if (!db.objectStoreNames.contains('my-courses')) {
        const courseStore = db.createObjectStore('my-courses', {
          keyPath: 'id',
          autoIncrement: true,
        });
        courseStore.createIndex('by-course-id', 'courseId', { unique: false });
      }
    },
  });
};

// Export function to initialize DB early
export const initIndexedDB = async () => {
  try {
    await openDB('edu-rise-db', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('users')) {
          const userStore = db.createObjectStore('users', {
            keyPath: 'id',
            autoIncrement: true,
          });
          userStore.createIndex('by-email', 'email', { unique: true });
          userStore.createIndex('by-username', 'username', { unique: true });
        }

        if (!db.objectStoreNames.contains('my-courses')) {
          const courseStore = db.createObjectStore('my-courses', {
            keyPath: 'id',
            autoIncrement: true,
          });
          courseStore.createIndex('by-course-id', 'courseId', {
            unique: false,
          });
        }
      },
    });
    console.log('IndexedDB initialized successfully');
  } catch (error) {
    console.error('Failed to initialize IndexedDB:', error);
  }
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

  // New method (find by email)
  getByEmail: async (storeName: string, email: string) => {
    const db = await initDB(storeName);
    // 'users' = store name, 'by-email' = index name created in upgrade()
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
  getByCourseId: async (storeName: string, courseId: string) => {
    const db = await initDB(storeName);
    return db.getAllFromIndex(storeName, 'by-course-id', courseId);
  },
};
