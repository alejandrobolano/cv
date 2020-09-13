import {Component, Input, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {TranslateWrapperService} from './core/service/translate-wrapper.service';
import {TranslateComponent} from './core/translate/translate.component';

@Component({
  selector: 'ambm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  @Input() isCollapsed = false;
  theme = 'dark';
  title = 'Alejandro M. Bolaño M.';


  constructor() {
  }

  ngOnInit(): void {
  }


}
