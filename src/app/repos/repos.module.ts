import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReposComponent } from './repos.component';
import { ReposRoutingModule } from './repos-routing.module';
import { ReposSearchFormComponent } from './repos-search-form/repos-search-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReposService } from './repos.service';
import { TableComponent } from './table/table.component';



@NgModule({
  declarations: [
    ReposComponent,
    ReposSearchFormComponent,
    TableComponent
  ],
  providers: [
    ReposService
  ],
  imports: [
    CommonModule,
    ReposRoutingModule,
    ReactiveFormsModule
  ]
})
export class ReposModule { }
