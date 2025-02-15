export class CookieManager {
  // Method to set a cookie
  static set(name: string, value: string, days: number = 1): void {
      let expires: string = "";
      if (days) {
          const date: Date = new Date();
          date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
          expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  // Method to get a cookie
  static get(name: string): string | null {
      const nameEQ = name + "=";
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) === ' ') c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
  }

  // Method to remove a cookie
  static remove(name: string): void {
      document.cookie = name + '=; Max-Age=-99999999;';
  }
}