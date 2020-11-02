import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {LanguageEnum} from '../enum/LanguageEnum';
import {CookiesService} from './cookies.service';

@Injectable({
  providedIn: 'root'
})
export class TranslateWrapperService {
  language$ = new BehaviorSubject<string>(LanguageEnum.ENGLISH);
  languageChange = this.language$.asObservable();

  constructor(public translate: TranslateService,
              public cookies: CookiesService) {
    this.useLanguage();
  }

  private useLanguage(): void{
    this.language = this.getLanguageOfCookie();
    this.translate.use(this.language);
    this.translate.setDefaultLang(this.language);
  }

  set language(value: string) {
    this.language$.next(value);
    this.setLanguageOfCookie(value);
  }

  get language(): string {
    return this.language$.getValue();
  }

  getLanguageOfCookie(): string{
    let language = this.cookies.getCookie('lang');
    if (!language) {
      const browserLang = this.translate.getBrowserLang();
      language = browserLang.match(/en|es|ca/) ? browserLang : this.language;
      this.setLanguageOfCookie(language);
    }
    return language;
  }

  setLanguageOfCookie(language: string): void {
    this.cookies.setCookie('lang',
      language,
      7,
      '/');
  }
}
