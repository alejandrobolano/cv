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
  language: string;
  linksPreview: ILinkPreview[] = [];
  isLoading = true;

  constructor(public translate: TranslateService,
              public translateWrapperService: TranslateWrapperService,
              private router: Router,
              private cookiesService: CookiesService,
              public windowResize: WindowResizeService,
              private linkPreview: LinkPreviewService) {
    super(translate, translateWrapperService);
  }

  ngOnInit(): void {
    this.initLinksPreview();
  }

  private initLinksPreview(): void {
    const linksPreviewCookie = this.cookiesService.getCookie(CookieNameEnum.LinksPreview);
    let hasLinksPreviewFromCookie = false;
    if (linksPreviewCookie){
      const linksPreviewCookieJson = JSON.parse(linksPreviewCookie);
      if (linksPreviewCookieJson) {
        this.linksPreview = linksPreviewCookieJson;
        hasLinksPreviewFromCookie = true;
        this.isLoading = false;
      }
    }
    if (!hasLinksPreviewFromCookie || Links.length !== this.linksPreview.length){
      this.loadLinksPreview();
    }
  }

  loadLinksPreview(): void {
    this.linksPreview = [];
    Links.forEach(link => {
      this.linkPreview.getLinkPreview(link)
        .subscribe(preview => {
          if (!preview.title) {
            preview.title = preview.url;
          }
          if (!preview.image) {
            preview.image = '../../assets/img/code-banner.jpg';
          }
          this.linksPreview.push(preview);
          // TODO change way for obtain linkPreview by cookie and doing filter
          this.cookiesService.setCookie(CookieNameEnum.LinksPreview, JSON.stringify(this.linksPreview));

          if (Links.length === this.linksPreview.length){
            this.isLoading = false;
          }
        }, error => {
          if (error.status === 429 || error.status === 426) {
            this.router.navigate(['/navigation/under-construction']).then(() => '');
          }
        });
    });
  }


}
