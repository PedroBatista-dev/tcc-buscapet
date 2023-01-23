import { NgModule } from '@angular/core';

import { AdoptionsRoutingModule } from './adoptions-routing.module';
import { AdoptionListComponent } from './adoption-list/adoption-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AdoptionListComponent
  ],
  imports: [
    SharedModule,
    AdoptionsRoutingModule
  ]
})
export class AdoptionsModule { }
