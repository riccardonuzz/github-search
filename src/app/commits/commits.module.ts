import { NgModule } from '@angular/core';
import { CommitsComponent } from './commits.component';
import { SharedModule } from '../shared/shared.module';
import { CommitsRoutingModule } from './commits-routing.module';
import { CommitsSearchFormComponent } from './commits-search-form/commits-search-form.component';
import { CommitsService } from './commits.service';



@NgModule({
  declarations: [
    CommitsComponent,
    CommitsSearchFormComponent
  ],
  providers: [
    CommitsService
  ],
  imports: [
    SharedModule,
    CommitsRoutingModule
  ]
})
export class CommitsModule { }
