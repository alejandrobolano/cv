import { NgModule } from '@angular/core';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {PrivateComponent} from './private.component';
import {PrivateRoutingModule} from './private-routing.module';
import { SitesComponent } from './sites/sites.component';

@NgModule({
  imports: [
    PrivateRoutingModule,
    NgZorroAntdModule,
    NzSpaceModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      isolate: true
    })
  ],
  declarations: [PrivateComponent, SitesComponent],
  exports: []
})
export class PrivateModule {}

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/private/', '.json');
}
