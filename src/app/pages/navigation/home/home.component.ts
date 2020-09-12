import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {TranslateWrapperService} from '../../../core/service/translate-wrapper.service';
import {TranslateComponent} from '../../../core/translate/translate.component';

@Component({
  selector: 'ambm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends TranslateComponent implements OnInit {
  language;

  constructor(public translate: TranslateService,
              public translateWrapperService: TranslateWrapperService) {
    super(translate, translateWrapperService);
  }

  ngOnInit(): void {}

}
