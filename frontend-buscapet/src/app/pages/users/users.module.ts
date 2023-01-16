import { NgModule } from '@angular/core';

import { UsersRoutingModule } from './users-routing.module';
import { LoginComponent } from './login/login.component';
import { UserAppComponent } from './users.app.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegistrationComponent } from './registration/registration.component';

import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    UserAppComponent
  ],
  imports: [
    SharedModule,
    UsersRoutingModule,
    TextMaskModule
  ]
})
export class UsersModule { }
