import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor() {
  }

  getCookie(name: string): string {
    const ca: Array<string> = document.cookie.split(';');
    const caLen: number = ca.length;
    const cookieName = `${name}=`;
    let c: string;

    for (let i = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) === 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
  }

  deleteCookie(name): void {
    this.setCookie(name, '', -1);
  }

  setCookie(name: string, value: string, expireDays: number = 3, path: string = ''): void {
    const date: Date = new Date();
    date.setTime(date.getTime() + expireDays * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    const cPath: string = path ? `; path=${path}` : '';
    document.cookie = `${name}=${value}; ${expires}${cPath}`;
  }



}
