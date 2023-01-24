import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdoptionCertificateComponent } from './adoption-certificate/adoption-certificate.component';
import { AdoptionFormComponent } from './adoption-form/adoption-form.component';
import { AdoptionListComponent } from './adoption-list/adoption-list.component';

const routes: Routes = [
  { path: '', component: AdoptionListComponent},
  { path: 'certificado', component: AdoptionCertificateComponent},
  { path: ':id/visualizar', component: AdoptionFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdoptionsRoutingModule { }
