import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdoptionAnimalFormComponent } from './adoption-animal-form/adoption-animal-form.component';
import { AdoptionCertificateComponent } from './adoption-certificate/adoption-certificate.component';
import { AdoptionFormComponent } from './adoption-form/adoption-form.component';
import { AdoptionListComponent } from './adoption-list/adoption-list.component';

const routes: Routes = [
  { path: '', component: AdoptionListComponent},
  { path: 'certificado', component: AdoptionCertificateComponent},
  { path: ':id/visualizar-adodante', component: AdoptionFormComponent},
  { path: ':id/visualizar-animal', component: AdoptionAnimalFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdoptionsRoutingModule { }
