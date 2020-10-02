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
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';

@NgModule({
  declarations: [FooterComponent, HeaderComponent, TranslateComponent, SidebarComponent, PageNotFoundComponent],
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
