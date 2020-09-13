import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {TranslateWrapperService} from '../service/translate-wrapper.service';

@Component({
  selector: 'ambm-core',
  template: ''
})
export class TranslateComponent implements OnInit {
  language;

  constructor(public translate: TranslateService,
              public translateWrapperService: TranslateWrapperService) {
    this.useLanguage();
  }

  ngOnInit(): void {
    this.useLanguage();
  }

  private useLanguage(): void {
    this.translateWrapperService.languageChange.subscribe(
      value => {
        this.language = value;
        this.translate.setDefaultLang(this.language);
        this.translate.use(this.language);
      }
    );
  }

}
