import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {TranslateWrapperService} from '../../../core/service/translate-wrapper.service';
import {TranslateComponent} from '../../../core/translate/translate.component';
import {WindowResizeService} from '../../../core/service/window-resize.service';
import {ILinkPreview} from '../../service/contracts/ilink-preview';
import {LinkPreviewService} from '../../service/link-preview.service';
import {Router} from '@angular/router';
import {CookiesService} from '../../../core/service/cookies.service';
import {CookieNameEnum} from '../../../core/enum/cookie-name.enum';
import {Links} from './data/Links';

@Component({
  selector: 'ambm-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.less']
})
export class PortfolioComponent extends TranslateComponent implements OnInit {

  constructor(public translate: TranslateService,
              public translateWrapperService: TranslateWrapperService,
              private router: Router,
              private cookiesService: CookiesService,
              public windowResize: WindowResizeService,
              private linkPreview: LinkPreviewService) {
    super(translate, translateWrapperService);
  }

  get isFinishLoading(): boolean {
    return true;
  }
  language: string;
  linksPreview: ILinkPreview[] = [];
  isLoading = true;

  public static checkUndefinedData(preview): void {
    if (!preview.title) {
      preview.title = preview.url;
    }
    if (!preview.image) {
      preview.image = '../../assets/img/code-banner.jpg';
    }
  }

  ngOnInit(): void {
    this.initLinksPreview();
  }

  private initLinksPreview(): void {
    const linksPreviewCookie = this.cookiesService.getCookie(CookieNameEnum.LinksPreview);
    let hasLinksPreviewFromCookie = false;
    if (linksPreviewCookie) {
      const linksPreviewCookieJson = JSON.parse(linksPreviewCookie);
      if (linksPreviewCookieJson) {
        this.linksPreview = linksPreviewCookieJson;
        hasLinksPreviewFromCookie = true;
        this.isLoading = false;
      }
    }
    if (!hasLinksPreviewFromCookie || Links.length !== this.linksPreview.length) {
      this.loadLinksPreview();
    }
  }

  loadLinksPreview(): void {
    this.linksPreview = [];
    Links.forEach(link => {
      this.linkPreview.getLinkPreview(link)
        .subscribe(preview => {
          PortfolioComponent.checkUndefinedData(preview);
          if (preview.url) {
            this.linksPreview.push(preview);
            // TODO change way for obtain linkPreview by cookie and doing filter
            this.cookiesService.setCookie(CookieNameEnum.LinksPreview, JSON.stringify(this.linksPreview));
          }
          if (this.isFinishLoading) {
            this.isLoading = false;
          }
        }, error => {
          if (error.status === 429 || error.status === 426) {
            this.redirectTo('/navigation/under-construction');
          }
        });
    });
  }

  redirectTo(component: string): void {
    this.router.navigate([component]).then(() => '');
  }


}
