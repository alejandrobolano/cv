import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {TranslateWrapperService} from '../../../core/service/translate-wrapper.service';
import {TranslateComponent} from '../../../core/translate/translate.component';
import {LinksEnum} from './enum/links.enum';
import {Router} from '@angular/router';

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
              public translateWrapperService: TranslateWrapperService,
              private router: Router) {
    super(translate, translateWrapperService);
  }

  ngOnInit(): void {
  }

  redirectToAboutMe(): void {
    this.router.navigate(['navigation/about-me']);
  }

  getPersonalSummaryTextVariable(i: number): string{
    return `home.personalSummary.text${i}`;
  }
}
