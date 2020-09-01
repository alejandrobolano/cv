import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = false;
  theme = 'dark';
  title = 'Alejandro M. Bolaño M.';
  imgLogo = 'https://ng.ant.design/assets/img/logo.svg';
  language = 'es';

  constructor(
    public translate: TranslateService
  ) {
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|es|ca/) ? browserLang : this.language);
    translate.setDefaultLang(this.language);
  }

  switchLanguage(lang: string): void {
    this.translate.use(lang);
  }

}
