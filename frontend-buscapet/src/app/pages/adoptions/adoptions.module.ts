import { NgModule } from '@angular/core';

import { AdoptionsRoutingModule } from './adoptions-routing.module';
import { AdoptionListComponent } from './adoption-list/adoption-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdoptionFormComponent } from './adoption-form/adoption-form.component';
import { AdoptionCertificateComponent } from './adoption-certificate/adoption-certificate.component';


@NgModule({
  declarations: [
    AdoptionListComponent,
    AdoptionFormComponent,
    AdoptionCertificateComponent
  ],
  imports: [
    SharedModule,
    AdoptionsRoutingModule
  ]
})
export class AdoptionsModule { }
