import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/conta', pathMatch: 'full'},
  { path: 'vacinas', loadChildren: () => import('./pages/vaccines/vaccines.module').then(m => m.VaccinesModule) },
  {
    path: 'conta', loadChildren: () => import('./pages/accounts/accounts.module').then(m => m.AccountsModule)
  },
  { path: 'nao-encontrado', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
