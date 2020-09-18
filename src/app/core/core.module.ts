import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './layout/footer/footer.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import { HeaderComponent } from './layout/header/header.component';
import {FormsModule} from '@angular/forms';
import { TranslateComponent } from './translate/translate.component';
import {TranslateModule} from '@ngx-translate/core';
import {AppRoutingModule} from '../app-routing.module';
import {SidebarComponent} from './layout/sidebar/sidebar.component';

@NgModule({
  declarations: [FooterComponent, HeaderComponent, TranslateComponent, SidebarComponent],
  exports: [
    FooterComponent,
    HeaderComponent,
    TranslateComponent,
    SidebarComponent
  ],
  imports: [
    NgZorroAntdModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    AppRoutingModule
  ]
})
export class CoreModule {
}
