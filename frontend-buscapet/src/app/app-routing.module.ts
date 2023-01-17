import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/users/login', pathMatch: 'full'},
  {
    path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule)
  },
  { path: 'vacinas', loadChildren: () => import('./pages/vaccines/vaccines.module').then(m => m.VaccinesModule) },
  { path: 'nao-encontrado', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
