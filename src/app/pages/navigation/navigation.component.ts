import { Component, OnInit } from '@angular/core';
import {en_US, NzI18nService} from 'ng-zorro-antd';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private i18n: NzI18nService) {
  }

  switchLanguage() {
    this.i18n.setLocale(en_US);
  }

  ngOnInit() {
    this.switchLanguage();
  }

}
