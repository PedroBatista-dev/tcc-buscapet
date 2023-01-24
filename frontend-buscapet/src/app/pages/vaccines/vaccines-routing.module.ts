import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VaccineGuard } from './shared/vaccine.guard';
import { VaccineFormComponent } from './vaccine-form/vaccine-form.component';
import { VaccineListComponent } from './vaccine-list/vaccine-list.component';

const routes: Routes = [
  { path: '', component: VaccineListComponent, canActivate: [VaccineGuard]},
  { path: 'novo', component: VaccineFormComponent, canActivate: [VaccineGuard],  canDeactivate: [VaccineGuard] },
  { path: ':id/editar', component: VaccineFormComponent, canActivate: [VaccineGuard], canDeactivate: [VaccineGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VaccinesRoutingModule { }
