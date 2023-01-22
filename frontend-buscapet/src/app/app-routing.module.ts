import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/users/login', pathMatch: 'full'},
  {
    path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule)
  },
  { path: 'vacinas', loadChildren: () => import('./pages/vaccines/vaccines.module').then(m => m.VaccinesModule) },
  { path: 'cores', loadChildren: () => import('./pages/colors/colors.module').then(m => m.ColorsModule) },
  { path: 'especies', loadChildren: () => import('./pages/species/species.module').then(m => m.SpeciesModule) },
  { path: 'racas', loadChildren: () => import('./pages/breeds/breeds.module').then(m => m.BreedsModule) },
  { path: 'animais', loadChildren: () => import('./pages/animals/animals.module').then(m => m.AnimalsModule) },
  { path: 'nao-encontrado', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
