import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {TranslateWrapperService} from '../../service/translate-wrapper.service';
import {LanguageEnum} from '../../enum/LanguageEnum';

@Component({
  selector: 'ambm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  @Output() collapseEmitter = new EventEmitter();
  @Input() isCollapsed = false;
  language: string = LanguageEnum.SPANISH;
  title = 'Alejandro M. Bolaño M.';
  gif = '/assets/img/alejandro-bolano.gif';

  constructor(public translate: TranslateService, public translateWrapperService: TranslateWrapperService) {
  }

  switchLanguage(lang: string): void {
    this.translate.use(lang);
    this.translateWrapperService.language = lang;
  }

  ngOnInit(): void {
    this.translateWrapperService.languageChange.subscribe(result => {
      this.language = result;
    });
  }

  collapseEvent(): void {
    this.isCollapsed = !this.isCollapsed;
    this.collapseEmitter.emit(this.isCollapsed);
  }

  getCountryCode(): string {
    switch (this.language) {
      case LanguageEnum.ENGLISH:
        return 'gb';
      case LanguageEnum.CATALAN:
        return 'es-ca';
      default:
        return 'es';
    }
  }

  pushFullScreen(): void {
    const documentElement = document.documentElement;
    if (documentElement.requestFullscreen) {
      documentElement.requestFullscreen();
    }
  }

}
