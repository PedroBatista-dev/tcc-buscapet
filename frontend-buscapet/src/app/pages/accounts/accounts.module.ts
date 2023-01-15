import { NgModule } from '@angular/core';

import { AccountsRoutingModule } from './accounts-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ContaAppComponent } from './accounts.app.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    ContaAppComponent
  ],
  imports: [
    SharedModule,
    AccountsRoutingModule,
    TextMaskModule
  ]
})
export class AccountsModule { }