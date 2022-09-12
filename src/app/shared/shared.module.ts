import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { ReposRoutingModule } from '../repos/repos-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule,
    ReposRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    ReposRoutingModule,
    ReactiveFormsModule,
    TableComponent
  ]
})
export class SharedModule { }
