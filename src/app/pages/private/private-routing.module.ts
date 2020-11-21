import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PrivateComponent} from './private.component';
import {SitesComponent} from './sites/sites.component';
import {AdminComponent} from './admin/admin.component';

const routes: Routes = [
  { path: '', component: PrivateComponent,
  children: [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'sites', component: SitesComponent },
    { path: 'admin', component: AdminComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
