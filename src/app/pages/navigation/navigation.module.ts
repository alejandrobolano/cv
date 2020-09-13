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
import {FormsModule} from '@angular/forms';
import { AboutMeComponent } from './about-me/about-me.component';
import {CommonModule} from '@angular/common';
import { CurriculumContainerComponent } from './about-me/curriculum-container/curriculum-container.component';


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
    CommonModule
  ],
  declarations: [NavigationComponent, HomeComponent, PortfolioComponent, AboutMeComponent, CurriculumContainerComponent],
  exports: [NavigationComponent]
})
export class NavigationModule {}

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/navigation/', '.json');
}
