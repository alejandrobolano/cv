import {Component, Input, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {TranslateWrapperService} from './core/service/translate-wrapper.service';
import {TranslateComponent} from './core/translate/translate.component';

@Component({
  selector: 'ambm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent extends TranslateComponent implements OnInit {
  @Input() isCollapsed = false;
  @Input() language = 'es';
  theme = 'dark';
  title = 'Alejandro M. Bolaño M.';
  imgLogo = 'https://ng.ant.design/assets/img/logo.svg';


  constructor(public translate: TranslateService,
              public translateWrapperService: TranslateWrapperService) {
    super(translate, translateWrapperService);
  }

  ngOnInit(): void {
  }


}
