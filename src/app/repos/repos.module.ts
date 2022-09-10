import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReposComponent } from './repos.component';
import { ReposRoutingModule } from './repos-routing.module';
import { ReposSearchFormComponent } from './repos-search-form/repos-search-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ReposComponent,
    ReposSearchFormComponent
  ],
  imports: [
    CommonModule,
    ReposRoutingModule,
    ReactiveFormsModule
  ]
})
export class ReposModule { }
