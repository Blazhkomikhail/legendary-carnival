export interface IRecord {
  [key: string]: string | number;
}

export default class IndexedDB {
  private openRequest: IDBOpenDBRequest;

  private db: IDBDatabase;

  onOk: (() => void) | null = null;

  onError: (() => void) | null = null;

  constructor() {
    if (!IndexedDB.idbOK) return;
    this.openRequest = indexedDB.open('Blazhkomikhail', 2);

    this.openRequest.onupgradeneeded = () => {
      this.db = this.openRequest.result;

      if (!this.db.objectStoreNames.contains('players')) {
        const objectStore = this.db.createObjectStore('players', {
          keyPath: 'email',
        });
        objectStore.clear();
      }
    };

    this.openRequest.onsuccess = () => {
      this.db = this.openRequest.result;
    };

    this.openRequest.onerror = () => {
      return new Error('Error');
    };
  }

  static idbOK(): boolean {
    return 'indexedDB' in window;
  }

  addUser(data: IRecord): void {
    // data have to start with key
    const transaction = this.db.transaction(['players'], 'readwrite');
    const store = transaction.objectStore('players');
    const request = store.put(data);

    request.onerror = () => {
      if (this.onError) {
        this.onError();
      }
    };
    request.onsuccess = () => {
      if (this.onOk) {
        this.onOk();
      }
    };
  }

  getUsers(): Promise<Array<IRecord>> {
    return new Promise((resolve) => {
      const transaction = this.db.transaction('players', 'readonly');
      const store = transaction.objectStore('players');
      const request = store.getAll();
      let resData: IRecord[] = [];
      request.onsuccess = () => {
        resData = request.result;
      };
      transaction.oncomplete = () => {
        resolve(resData);
      };
    });
  }
}
