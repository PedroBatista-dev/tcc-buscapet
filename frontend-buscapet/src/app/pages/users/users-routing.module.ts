import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvatarUserComponent } from './avatar/avatar-user.component';
import { LoginComponent } from './login/login.component';
import { ProfileFormComponent } from './profile/profile-form.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserGuard } from './shared/user.guard';

const routes: Routes = [
  { path: '', redirectTo: '/users/login', pathMatch: 'full'},
  { path: 'novo', component: RegistrationComponent, canActivate: [UserGuard], canDeactivate: [UserGuard] },
  { path: 'login', component: LoginComponent, canActivate: [UserGuard] },
  { path: ':id/avatar', component: AvatarUserComponent },
  { path: ':id/profile', component: ProfileFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
