import { Modal } from '../../components/shared/modal/modal';
import { Message } from './message/message';
import { appContainer } from '../../index';
const MESSAGE_TIME = 3000;
export let users: Array<IData>;
export interface IData {
  [key: string]: string | number;
}

export class IndexedDB {
  private openRequest: IDBOpenDBRequest;
  private db: IDBDatabase;

  constructor() {
    if (!this.idbOK) return;
    this.openRequest = indexedDB.open('Blazhkomikhail', 2);

    this.openRequest.onupgradeneeded = () => {
      this.db = this.openRequest.result;

      if (!this.db.objectStoreNames.contains('players')) {
        const objectStore = this.db.createObjectStore('players', {
          keyPath: 'email'
        });
      }
    }

    this.openRequest.onsuccess = () => {
      this.db = this.openRequest.result;
    };

    this.openRequest.onerror = () => {
      return new Error('Error');
    };
  }

  idbOK() {
    return 'indexedDB' in window;
  }
  
  addUser(data: IData) { 
    //data have to start with key
    const transaction = this.db.transaction(['players'], 'readwrite');
    const store = transaction.objectStore('players');
    const request = store.put(data);
    
    request.onerror = (e) => {
      let message = new Modal(
        'Warning!', 
        new Message('Something went wrong. Try again later!')
        );
      appContainer.appendChild(message.element);
      setTimeout(() => {
        message.element.remove();
      }, MESSAGE_TIME)
    }
    request.onsuccess = () => {
      let message = new Modal(
        'Successful!', 
        new Message('New player created!')
        );
      appContainer.appendChild(message.element);
      setTimeout(() => {
        message.element.remove();
      }, MESSAGE_TIME)
    };
  };

  getUsers() {
    const transaction = this.db.transaction(['players'], 'readonly');
    const store = transaction.objectStore('players');

    const request = store.getAll();

    request.onerror = () => {
      console.log('do smtg');
    }
    request.onsuccess = () => {
      users = request.result;
    }
  }
}

