import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PrivateComponent} from './private.component';
import {SitesComponent} from './sites/sites.component';

const routes: Routes = [
  { path: '', component: PrivateComponent,
  children: [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'sites', component: SitesComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
