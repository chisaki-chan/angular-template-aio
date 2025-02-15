import { TCurrentUser } from 'src/types';
import { CURRENT_USER_KEY, TOKEN_KEY } from '../global-component';
import { CookieManager } from './cookie-manager';

export class PersistenceStorage {
  private static CURRENT_USER_KEY = CURRENT_USER_KEY;
  private static TOKEN_KEY = TOKEN_KEY;

  static user = {
    set(dataLogin: TCurrentUser): void {
      sessionStorage.setItem(PersistenceStorage.CURRENT_USER_KEY, JSON.stringify(dataLogin));
      // CookieManager.set(PersistenceStorage.CURRENT_USER_KEY, JSON.stringify(dataLogin), 1);
      localStorage.setItem(PersistenceStorage.CURRENT_USER_KEY, JSON.stringify(dataLogin));
    },
    get(): TCurrentUser | null {
      const userFromSession = sessionStorage.getItem(PersistenceStorage.CURRENT_USER_KEY);
      const userFromCookie = null;
      const userFromLocalStorage = localStorage.getItem(PersistenceStorage.CURRENT_USER_KEY);

      const storedData = userFromSession || userFromCookie || userFromLocalStorage;

      if (storedData) {
        return JSON.parse(storedData);
      }
      return null;
    },
    remove(): void {
      sessionStorage.removeItem(PersistenceStorage.CURRENT_USER_KEY);
      // CookieManager.remove(PersistenceStorage.CURRENT_USER_KEY);
      localStorage.removeItem(PersistenceStorage.CURRENT_USER_KEY);
    },
  };

  static token = {
    set(token: string): void {
      sessionStorage.setItem(PersistenceStorage.TOKEN_KEY, token);
      CookieManager.set(PersistenceStorage.TOKEN_KEY, token, 1);
      localStorage.setItem(PersistenceStorage.TOKEN_KEY, token);
    },
    get(): string | null {
      return (
        sessionStorage.getItem(PersistenceStorage.TOKEN_KEY) ||
        CookieManager.get(PersistenceStorage.TOKEN_KEY) ||
        localStorage.getItem(PersistenceStorage.TOKEN_KEY)
      );
    },
    remove(): void {
      sessionStorage.removeItem(PersistenceStorage.TOKEN_KEY);
      CookieManager.remove(PersistenceStorage.TOKEN_KEY);
      localStorage.removeItem(PersistenceStorage.TOKEN_KEY);
    },
  };
}
