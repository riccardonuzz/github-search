import { NgModule } from '@angular/core';
import { ReposComponent } from './repos.component';
import { ReposSearchFormComponent } from './repos-search-form/repos-search-form.component';
import { ReposService } from './repos.service';
import { SharedModule } from '../shared/shared.module';



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
  ]
})
export class ReposModule { }
