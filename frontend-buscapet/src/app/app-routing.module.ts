import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'vacinas', loadChildren: () => import('./pages/vaccines/vaccines.module').then(m => m.VaccinesModule) },
 // { path: '', redirectTo: '/vacinas', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
