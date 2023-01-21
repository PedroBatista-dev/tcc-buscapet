import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColorGuard } from './shared/color.guard';
import { ColorFormComponent } from './color-form/color-form.component';
import { ColorListComponent } from './color-list/color-list.component';

const routes: Routes = [
  { path: '', component: ColorListComponent},
  { path: 'novo', component: ColorFormComponent,  canDeactivate: [ColorGuard] },
  { path: ':id/editar', component: ColorFormComponent,  canDeactivate: [ColorGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColorsRoutingModule { }
