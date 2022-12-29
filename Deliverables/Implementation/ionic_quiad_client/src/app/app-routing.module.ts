import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  // {
  //   path: '',
  //   loadChildren: () => import('./account/account-routing.module').then( m => m.AccountRoutingModule)
  // },
  // {
  //   path: 'dashboard',
  //   loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  // },
  // {
  //   path: 'document',
  //   loadChildren: () => import('./document/document.module').then( m => m.DocumentPageModule)
  // },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then( m => m.MainPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
