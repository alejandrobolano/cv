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

@Component({
  selector: 'ambm-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.less']
})
export class PortfolioComponent extends TranslateComponent implements OnInit {
  language: string;
  width: any;
  height: any;
  preview: ILinkPreview;
  links = ['cubabluediving.com',
    'ansinsuranceservices.com',
    'ngxsmartskeleton.web.app'
  ];

  linksPreview: ILinkPreview[] = [];

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
    const linksPreviewCookie = JSON.parse(this.cookiesService.getCookie(CookieNameEnum.LinksPreview));
    if (linksPreviewCookie.length === this.links.length) {
      this.linksPreview = linksPreviewCookie;
    } else {
      this.loadLinksPreview();
    }
  }

  loadLinksPreview(): void {
    this.links.forEach(link => {
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
        }, error => {
          if (error.status !== 200) {
            this.router.navigate(['/navigation/under-construction']).then(r => '');
          }
        });
    });
  }


}
