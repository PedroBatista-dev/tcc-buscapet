import { NgModule } from '@angular/core';

import { AdoptionsRoutingModule } from './adoptions-routing.module';
import { AdoptionListComponent } from './adoption-list/adoption-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdoptionFormComponent } from './adoption-form/adoption-form.component';
import { AdoptionCertificateComponent } from './adoption-certificate/adoption-certificate.component';
import { AdoptionAnimalFormComponent } from './adoption-animal-form/adoption-animal-form.component';


@NgModule({
  declarations: [
    AdoptionListComponent,
    AdoptionFormComponent,
    AdoptionAnimalFormComponent,
    AdoptionCertificateComponent
  ],
  imports: [
    SharedModule,
    AdoptionsRoutingModule
  ]
})
export class AdoptionsModule { }
