import {Component, HostListener, OnInit} from '@angular/core';
import {ISite} from './data/ISite';
import {SITES} from './data/Sites';
import {TranslateComponent} from '../../../core/translate/translate.component';
import {TranslateService} from '@ngx-translate/core';
import {TranslateWrapperService} from '../../../core/service/translate-wrapper.service';

@Component({
  selector: 'ambm-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.less']
})
export class SitesComponent extends TranslateComponent implements OnInit {
  sites: ISite[] = SITES;
  searchValue = '';
  isVisible = true;
  sitesForDisplay = [...this.sites];
  size = null;

  constructor(public translate: TranslateService,
              public translateWrapperService: TranslateWrapperService) {
    super(translate, translateWrapperService);
  }

  ngOnInit(): void {
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.size = document.querySelector('body').offsetWidth;
  }

  get isMobile(): boolean {
    return this.size && this.size < 768;
  }

  search(text: string): ISite[] {
    return this.sites.filter(site => {
      const term = text.toLowerCase();
      let summary = '';
      let description = '';
      this.translate.get(site.summary).subscribe((aux: string) => summary = aux);
      this.translate.get(site.description).subscribe((aux: string) => description = aux);
      return site.name.toLowerCase().includes(term)
        || (site.url.toLowerCase().includes(term) && !this.isMobile)
        || summary.includes(term)
        || description.includes(term);
    });
  }

  getSites(text: string): ISite[] {
    return this.search(text);
  }

}
