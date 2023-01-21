import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecieGuard } from './shared/specie.guard';
import { SpecieFormComponent } from './specie-form/specie-form.component';
import { SpecieListComponent } from './specie-list/specie-list.component';

const routes: Routes = [
  { path: '', component: SpecieListComponent},
  { path: 'novo', component: SpecieFormComponent,  canDeactivate: [SpecieGuard] },
  { path: ':id/editar', component: SpecieFormComponent,  canDeactivate: [SpecieGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpeciesRoutingModule { }
