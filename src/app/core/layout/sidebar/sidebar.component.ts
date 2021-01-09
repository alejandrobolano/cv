import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {TranslateComponent} from '../../translate/translate.component';
import {TranslateService} from '@ngx-translate/core';
import {TranslateWrapperService} from '../../service/translate-wrapper.service';
import {WindowResizeService} from '../../service/window-resize.service';

@Component({
  selector: 'ambm-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent extends TranslateComponent implements OnInit {
  @Input() isCollapsed = false;
  @Input() language: string;
  @Output() collapseEmitter = new EventEmitter<boolean>();
  theme = 'dark';
  title = 'Alejandro M. Bolaño M.';
  imgLogo = 'https://ng.ant.design/assets/img/logo.svg';

  constructor(public translate: TranslateService,
              public translateWrapperService: TranslateWrapperService,
              private windowResize: WindowResizeService) {
    super(translate, translateWrapperService);
  }


  ngOnInit(): void {
  }

  collapseEvent(): void {
    if (this.windowResize.IsMobile) {
      this.isCollapsed = !this.isCollapsed;
      this.collapseEmitter.emit(this.isCollapsed);
    }
  }


}
