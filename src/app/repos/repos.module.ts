import { NgModule } from '@angular/core';
import { ReposComponent } from './repos.component';
import { ReposSearchFormComponent } from './repos-search-form/repos-search-form.component';
import { ReposService } from './repos.service';
import { SharedModule } from '../shared/shared.module';
import { ReposRoutingModule } from './repos-routing.module';



@NgModule({
  declarations: [
    ReposComponent,
    ReposSearchFormComponent,
  ],
  providers: [
    ReposService
  ],
  imports: [
    SharedModule,
    ReposRoutingModule
  ]
})
export class ReposModule { }
