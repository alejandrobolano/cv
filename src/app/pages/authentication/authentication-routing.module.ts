import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LogInComponent} from './log-in/log-in.component';
import {AuthenticationComponent} from './authentication.component';

const routes: Routes = [
  { path: '', component: AuthenticationComponent,
  children: [
    { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
    { path: 'log-in', component: LogInComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
