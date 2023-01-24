import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreedGuard } from './shared/breed.guard';
import { BreedFormComponent } from './breed-form/breed-form.component';
import { BreedListComponent } from './breed-list/breed-list.component';

const routes: Routes = [
  { path: '', component: BreedListComponent, canActivate: [BreedGuard]},
  { path: 'novo', component: BreedFormComponent, canActivate: [BreedGuard],  canDeactivate: [BreedGuard] },
  { path: ':id/editar', component: BreedFormComponent, canActivate: [BreedGuard],  canDeactivate: [BreedGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BreedsRoutingModule { }
