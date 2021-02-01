import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {TranslateWrapperService} from '../../../core/service/translate-wrapper.service';
import {TranslateComponent} from '../../../core/translate/translate.component';
import {MySocialNetworksEnum} from '../../../core/enum/my-social-networks.enum';
import {LinksEnum} from './enum/links.enum';

@Component({
  selector: 'ambm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent extends TranslateComponent implements OnInit {
  language;
  image = '/assets/img/code-banner.jpg';
  thisRepoGitHubLink = LinksEnum.ThisRepoGitHub;
  angularCliLink = LinksEnum.AngularCli;
  firebaseLink = LinksEnum.Firebase;
  antDesignLink = LinksEnum.AntDesign;

  constructor(public translate: TranslateService,
              public translateWrapperService: TranslateWrapperService) {
    super(translate, translateWrapperService);
  }

  ngOnInit(): void {
  }

}
