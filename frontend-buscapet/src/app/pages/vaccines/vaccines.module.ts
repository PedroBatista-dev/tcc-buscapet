import { NgModule } from '@angular/core';

import { VaccinesRoutingModule } from './vaccines-routing.module';
import { VaccineListComponent } from './vaccine-list/vaccine-list.component';
import { VaccineFormComponent } from './vaccine-form/vaccine-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    VaccineListComponent,
    VaccineFormComponent
  ],
  imports: [
    SharedModule,
    VaccinesRoutingModule,
  ]
})
export class VaccinesModule { }
