import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalGuard } from './shared/animal.guard';
import { AnimalFormComponent } from './animal-form/animal-form.component';
import { AnimalListComponent } from './animal-list/animal-list.component';
import { AvatarAnimalComponent } from './avatar/avatar-animal.component';

const routes: Routes = [
  { path: '', component: AnimalListComponent},
  { path: 'novo', component: AnimalFormComponent,  canDeactivate: [AnimalGuard] },
  { path: ':id/editar', component: AnimalFormComponent,  canDeactivate: [AnimalGuard] },
  { path: ':id/avatar', component: AvatarAnimalComponent,  canDeactivate: [AnimalGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimalsRoutingModule { }
