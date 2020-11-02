import { NgModule } from '@angular/core';

import { NavigationRoutingModule } from './navigation-routing.module';
import { NavigationComponent } from './navigation.component';
import { HomeComponent } from './home/home.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { HttpClient } from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AboutMeModule} from './about-me/about-me.module';
import { ContactComponent } from './contact/contact.component';
import { ModalComponent } from './common/modal/modal.component';
import { ContentComponent } from './common/modal/content/content.component';
import {CoreModule} from '../../core/core.module';


@NgModule({
  imports: [
    NavigationRoutingModule,
    NgZorroAntdModule,
    NzSpaceModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      isolate: true
    }),
    FormsModule,
    CommonModule,
    AboutMeModule,
    ReactiveFormsModule,
    CoreModule
  ],
  declarations: [NavigationComponent, HomeComponent, PortfolioComponent, ContactComponent, ModalComponent, ContentComponent],
  exports: []
})
export class NavigationModule {}

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/navigation/', '.json');
}
