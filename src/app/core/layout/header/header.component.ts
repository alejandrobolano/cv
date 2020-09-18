import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {TranslateWrapperService} from '../../service/translate-wrapper.service';

@Component({
  selector: 'ambm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() collapseEmitter = new EventEmitter();
  @Input() isCollapsed = false;
  language = 'es';
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

  getCountryCode(): string{
    switch (this.language) {
      case 'en':
        return 'gb';
      case 'ca':
        return 'es-ca';
      default:
        return 'es';
    }
  }

  toggleFullScreen(): void {
    const documentElement = document.documentElement;
    if (documentElement.requestFullscreen) {
      documentElement.requestFullscreen();
    } else if (documentElement.mozRequestFullScreen) {
      documentElement.mozRequestFullScreen();
    } else if (documentElement.webkitRequestFullscreen) {
      documentElement.webkitRequestFullscreen();
    } else if (documentElement.msRequestFullscreen) {
      documentElement.msRequestFullscreen();
    }
  }
}
