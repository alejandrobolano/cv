import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  constructor(public translate: TranslateService, public http: HttpClient) {
    debugger
    translate.use(translate.store.currentLang);
  }

  ngOnInit(): void {}

}
