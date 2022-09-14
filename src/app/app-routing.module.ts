import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'commits',
    loadChildren: () => import('./commits/commits.module').then(module => module.CommitsModule)
  },
  {
    path: 'repos',
    loadChildren: () => import('./repos/repos.module').then(module => module.ReposModule)
  },
  { path: '**', redirectTo: 'repos' },
  { path: '', redirectTo: 'repos', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
