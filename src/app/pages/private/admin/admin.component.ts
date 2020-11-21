import {Component, OnInit} from '@angular/core';
import {TranslateComponent} from '../../../core/translate/translate.component';
import {TranslateService} from '@ngx-translate/core';
import {TranslateWrapperService} from '../../../core/service/translate-wrapper.service';
import {WindowResizeService} from '../../../core/service/window-resize.service';

@Component({
  selector: 'ambm-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent extends TranslateComponent implements OnInit {

  constructor(public translate: TranslateService,
              public translateWrapperService: TranslateWrapperService,
              private windowResize: WindowResizeService) {
    super(translate, translateWrapperService);
  }

  ngOnInit(): void {
  }

  get isMobile(): boolean {
    return this.windowResize.IsMobile;
  }
  get isCustomDevice(): boolean {
    return this.windowResize.IsCustomDevice;
  }
}
