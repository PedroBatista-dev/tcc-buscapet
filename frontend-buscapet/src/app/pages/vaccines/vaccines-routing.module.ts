import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VaccineFormComponent } from './vaccine-form/vaccine-form.component';
import { VaccineListComponent } from './vaccine-list/vaccine-list.component';

const routes: Routes = [
  { path: '', component: VaccineListComponent },
  { path: 'novo', component: VaccineFormComponent },
  { path: ':id/editar', component: VaccineFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VaccinesRoutingModule { }
