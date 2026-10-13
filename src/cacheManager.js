/**
 * cacheManager.js
 * IndexedDB + Stale-While-Revalidate caching system for Pokémon Meta & Builds.
 *
 * Stores data locally with versioning and TTL (Time-To-Live).
 * Supports manual/background synchronization for upcoming balance/meta patches.
 */

const DB_NAME = 'PokemonAnalyzerDB';
const DB_VERSION = 1;
const STORE_NAME = 'app_cache';

// Cache TTL configuration
export const CACHE_KEYS = {
  META_DATA: 'meta_data_v1',
  BUILDS_DATA: 'builds_data_v2',
  PATCH_INFO: 'patch_info_v1'
};

const DEFAULT_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

// Open or create IndexedDB
function openDB() {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      return reject(new Error('IndexedDB not supported'));
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'key' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Get cached item from IndexedDB
 * @param {string} key
 * @returns {Promise<{data: any, isExpired: boolean, timestamp: number}|null>}
 */
export async function getCache(key) {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);

      req.onsuccess = () => {
        const item = req.result;
        if (!item) return resolve(null);

        const age = Date.now() - item.timestamp;
        const isExpired = age > (item.ttl || DEFAULT_TTL_MS);
        resolve({
          data: item.data,
          isExpired,
          timestamp: item.timestamp,
          patchVersion: item.patchVersion || '1.0'
        });
      };
      req.onerror = () => resolve(null);
    });
  } catch (err) {
    console.warn('[Cache] Error reading from IndexedDB:', err);
    return null;
  }
}

/**
 * Save item into IndexedDB cache
 * @param {string} key
 * @param {any} data
 * @param {number} ttl - TTL in milliseconds
 * @param {string} patchVersion - Optional patch version string
 */
export async function setCache(key, data, ttl = DEFAULT_TTL_MS, patchVersion = '1.0') {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put({
        key,
        data,
        timestamp: Date.now(),
        ttl,
        patchVersion
      });

      req.onsuccess = () => resolve(true);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('[Cache] Error writing to IndexedDB:', err);
    return false;
  }
}

/**
 * Clear specific cache key or all cache
 * @param {string} [key] - If omitted, clears all cache
 */
export async function clearCache(key = null) {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = key ? store.delete(key) : store.clear();

      req.onsuccess = () => resolve(true);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('[Cache] Error clearing cache:', err);
    return false;
  }
}
