import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {TranslateComponent} from '../../translate/translate.component';
import {TranslateService} from '@ngx-translate/core';
import {TranslateWrapperService} from '../../service/translate-wrapper.service';
import {WindowResizeService} from '../../service/window-resize.service';
import {AuthService} from '../../service/authentication/auth.service';

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
  imgLogo = '/assets/img/web-programming.svg';

  constructor(public translate: TranslateService,
              public translateWrapperService: TranslateWrapperService,
              private windowResize: WindowResizeService,
              private authService: AuthService) {
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

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userDataLoggedIn(): any {
    return this.authService.userData !== undefined ? this.authService.userData : '';
  }

  logOut(): void {
    this.authService.signOut();
  }


}
