import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInComponent } from './log-in/log-in.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AuthenticationRoutingModule} from './authentication-routing.module';
import {AuthenticationComponent} from './authentication.component';
import {NzButtonModule, NzCheckboxModule, NzFormModule, NzInputModule, NzTypographyModule} from 'ng-zorro-antd';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [AuthenticationComponent, LogInComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      isolate: true
    }),
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzTypographyModule,
    NzCheckboxModule,
  ]
})
export class AuthenticationModule { }

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/authentication/', '.json');
}
