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
import { PageUnderConstructionComponent } from './layout/page-under-construction/page-under-construction.component';

@NgModule({
  declarations: [FooterComponent, HeaderComponent, TranslateComponent, SidebarComponent, PageNotFoundComponent,
  PageUnderConstructionComponent],
  exports: [
    FooterComponent,
    HeaderComponent,
    TranslateComponent,
    SidebarComponent,
    PageUnderConstructionComponent
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
