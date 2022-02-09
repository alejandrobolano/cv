import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation.component';
import { HomeComponent } from './home/home.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import {ContactComponent} from './contact/contact.component';
import {PageUnderConstructionComponent} from '../../core/layout/page-under-construction/page-under-construction.component';

const routes: Routes = [
  { path: '', component: NavigationComponent,
  children: [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent},
    { path: 'portfolio', component: PortfolioComponent },
    { path: 'cv', pathMatch: 'full', redirectTo: 'about-me'},
    { path: 'curriculum', pathMatch: 'full', redirectTo: 'about-me'},
    { path: 'about-me', loadChildren: () => import('./about-me/about-me.module').then(m => m.AboutMeModule)},
    { path: 'contact', component: ContactComponent },
    { path: 'under-construction', component: PageUnderConstructionComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationRoutingModule { }
