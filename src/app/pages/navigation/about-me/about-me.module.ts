import { NgModule } from '@angular/core';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {FormsModule} from '@angular/forms';
import { AboutMeContainerComponent } from './about-me-container/about-me-container.component';
import {CommonModule} from '@angular/common';
import { CurriculumContainerComponent } from './curriculum-container/curriculum-container.component';
import {AboutMeRoutingModule} from './about-me-routing.module';


@NgModule({
  imports: [
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
    AboutMeRoutingModule
  ],
  declarations: [AboutMeContainerComponent, CurriculumContainerComponent],
  exports: [AboutMeContainerComponent]
})
export class AboutMeModule {}

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/navigation/about-me/', '.json');
}
