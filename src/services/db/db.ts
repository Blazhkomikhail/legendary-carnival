export interface IRecord {
  [key: string]: string | number;
}

export default class IndexedDB {
  private openRequest: IDBOpenDBRequest;

  private db: IDBDatabase;

  showMessage: ((message: string) => void) | null = null;

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
      if (this.showMessage) {
        this.showMessage('Warning! Something went wrong. Try again later!');
      }
    };
    request.onsuccess = () => {
      if (this.showMessage) {
        this.showMessage('Successful! New player have been created!');
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
