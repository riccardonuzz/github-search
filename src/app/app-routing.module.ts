import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'repos',
    loadChildren: () => import('./repos/repos.module').then(module => module.ReposModule)
  },
  { path: '', redirectTo: 'repos', pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
