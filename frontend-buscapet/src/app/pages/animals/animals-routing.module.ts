import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalGuard } from './shared/animal.guard';
import { AnimalFormComponent } from './animal-form/animal-form.component';
import { AnimalListComponent } from './animal-list/animal-list.component';
import { AvatarAnimalComponent } from './avatar/avatar-animal.component';
import { AnimalFilterGuard } from './shared/animal-filter.guard';
import { AnimalFilterComponent } from './animal-filter/animal-filter.component';
import { AnimalViewComponent } from './animal-view/animal-view.component';

const routes: Routes = [
  { path: '', component: AnimalListComponent, canActivate: [AnimalGuard]},
  { path: 'novo', component: AnimalFormComponent,  canDeactivate: [AnimalGuard], canActivate: [AnimalGuard] },
  { path: ':id/editar', component: AnimalFormComponent,  canDeactivate: [AnimalGuard], canActivate: [AnimalGuard] },
  { path: ':id/avatar', component: AvatarAnimalComponent,  canDeactivate: [AnimalGuard], canActivate: [AnimalGuard] },
  { path: 'filtrar', component: AnimalFilterComponent, canActivate: [AnimalFilterGuard] },
  { path: ':id/visualizar-animal', component: AnimalViewComponent, canActivate: [AnimalFilterGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimalsRoutingModule { }
