import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu-page/menu-page.module').then( m => m.MenuPagePageModule)
  },
  {
    path: 'currentOrder',
    loadChildren: () => import('./pages/current-order/current-order.module').then( m => m.CurrentOrderPageModule)
  },
  {
    path: 'previousOrder',
    loadChildren: () => import('./pages/previous-order/previous-order.module').then( m => m.PreviousOrderPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
