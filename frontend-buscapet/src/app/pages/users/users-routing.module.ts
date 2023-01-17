import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAppComponent } from './users.app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserGuard } from './shared/user.guard';

const routes: Routes = [
  {
    path: '', component: UserAppComponent,
    children: [
            { path: 'novo', component: RegistrationComponent, canActivate: [UserGuard], canDeactivate: [UserGuard] },
            { path: 'login', component: LoginComponent, canActivate: [UserGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
