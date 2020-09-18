import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AboutMeContainerComponent} from './about-me-container/about-me-container.component';

const routes: Routes = [
  { path: '', component: AboutMeContainerComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutMeRoutingModule { }
