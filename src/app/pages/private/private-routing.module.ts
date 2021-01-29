import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PrivateComponent} from './private.component';
import {SitesComponent} from './sites/sites.component';
import {AdminComponent} from './admin/admin.component';
import {AuthGuard} from '../../core/service/authentication/auth.guard';

const routes: Routes = [
  { path: '', component: PrivateComponent,
  children: [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'sites', component: SitesComponent, canActivate: [AuthGuard] },
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
