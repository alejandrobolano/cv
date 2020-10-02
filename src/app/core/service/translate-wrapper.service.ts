import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {LanguageEnum} from '../enum/LanguageEnum';

@Injectable({
  providedIn: 'root'
})
export class TranslateWrapperService {
  language$ = new BehaviorSubject<string>(LanguageEnum.ENGLISH);
  languageChange = this.language$.asObservable();

  constructor(public translate: TranslateService) {
    this.useLanguage();
  }

  private useLanguage(): void{
    const browserLang = this.translate.getBrowserLang();
    this.language = browserLang.match(/en|es|ca/) ? browserLang : this.language;
    this.translate.use(this.language);
    this.translate.setDefaultLang(this.language);
  }

  set language(value: string) {
    this.language$.next(value);
  }

  get language(): string {
    return this.language$.getValue();
  }
}
