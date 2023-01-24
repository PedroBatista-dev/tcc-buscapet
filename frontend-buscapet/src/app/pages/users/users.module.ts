import { NgModule } from '@angular/core';

import { UsersRoutingModule } from './users-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegistrationComponent } from './registration/registration.component';

import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    SharedModule,
    UsersRoutingModule,
    TextMaskModule
  ]
})
export class UsersModule { }
