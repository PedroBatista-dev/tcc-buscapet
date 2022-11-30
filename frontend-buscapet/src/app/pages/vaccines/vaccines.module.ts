import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { VaccinesRoutingModule } from './vaccines-routing.module';
import { VaccineListComponent } from './vaccine-list/vaccine-list.component';
import { VaccineFormComponent } from './vaccine-form/vaccine-form.component';


@NgModule({
  declarations: [
    VaccineListComponent,
    VaccineFormComponent
  ],
  imports: [
    CommonModule,
    VaccinesRoutingModule,
    ReactiveFormsModule
  ]
})
export class VaccinesModule { }
