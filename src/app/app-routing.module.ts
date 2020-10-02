import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageNotFoundComponent} from './core/layout/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'navigation' },
  { path: 'navigation', loadChildren: () => import('./pages/navigation/navigation.module').then(m => m.NavigationModule) },
  { path: 'private', loadChildren: () => import('./pages/private/private.module').then(m => m.PrivateModule) },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
