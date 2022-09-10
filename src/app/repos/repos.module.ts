import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReposComponent } from './repos.component';
import { ReposRoutingModule } from './repos-routing.module';



@NgModule({
  declarations: [
    ReposComponent
  ],
  imports: [
    CommonModule,
    ReposRoutingModule
  ]
})
export class ReposModule { }
