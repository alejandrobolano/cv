import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {TranslateWrapperService} from '../../../core/service/translate-wrapper.service';
import {TranslateComponent} from '../../../core/translate/translate.component';
import {WindowResizeService} from '../../../core/service/window-resize.service';

@Component({
  selector: 'ambm-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.less']
})
export class PortfolioComponent extends TranslateComponent implements OnInit {
  language: string;
  img = '../../assets/img/portada-cubabluediving.jpg';
  width: any;
  height: any;
  isUnderBuilder = true;

  constructor(public translate: TranslateService,
              public translateWrapperService: TranslateWrapperService,
              private windowResize: WindowResizeService) {
    super(translate, translateWrapperService);
    this.width = windowResize.Width;
    this.height = windowResize.Height;
  }

  ngOnInit(): void {}

}
