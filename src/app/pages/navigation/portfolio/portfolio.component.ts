import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {TranslateWrapperService} from '../../../core/service/translate-wrapper.service';
import {TranslateComponent} from '../../../core/translate/translate.component';

@Component({
  selector: 'ambm-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent extends TranslateComponent implements OnInit {
  language: string;
  img = '../../assets/img/portada-cubabluediving.jpg';

  constructor(public translate: TranslateService,
              public translateWrapperService: TranslateWrapperService) {
    super(translate, translateWrapperService);
  }

  ngOnInit(): void {}

}
