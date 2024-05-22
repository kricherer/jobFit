export type StorageKey = 'jobRequirements';
type StorageArea = chrome.storage.StorageArea;
type StorageValue = any;
interface Storage {
  get(key: StorageKey): Promise<StorageValue>;
  set(key: StorageKey, value: StorageValue): Promise<void>;
  remove(...keys: StorageKey[]): Promise<boolean>;
  clear(): Promise<void>;
}

abstract class BaseStorage implements Storage {
  async get(key: StorageKey): Promise<StorageValue> {
    return new Promise((resolve, reject) => {
      this.getStorageArea().get(key, (result) => {
        const err = chrome.runtime.lastError;
        if (err) {
          reject(err);
        } else {
          resolve(result[key]);
        }
      });
    });
  }

  async set(key: StorageKey, value: StorageValue): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.getStorageArea().set({ [key]: value }, () => {
        const err = chrome.runtime.lastError;
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  remove(...keys: StorageKey[]): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      let keysRemoved = 0;
      for (const key of keys) {
        this.getStorageArea().remove(key, () => {
          const err = chrome.runtime?.lastError;
          if (err) reject(err);
          else keysRemoved++;
        });
      }
      resolve(keysRemoved === keys.length);
    });
  }
  clear(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.getStorageArea().clear(resolve);
    });
  }

  protected abstract getStorageArea(): StorageArea;
}

class LocalStorage extends BaseStorage {
  getStorageArea() {
    return chrome.storage.local;
  }
}
class SyncStorage extends BaseStorage {
  getStorageArea(): StorageArea {
    return chrome.storage.sync;
  }
}

export const localStorage = new LocalStorage();
