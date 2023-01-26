import { NgModule } from '@angular/core';

import { UsersRoutingModule } from './users-routing.module';
import { LoginComponent } from './login/login.component';
import { AvatarUserComponent } from './avatar/avatar-user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegistrationComponent } from './registration/registration.component';

import { TextMaskModule } from 'angular2-text-mask';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ProfileFormComponent } from './profile/profile-form.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    AvatarUserComponent,
    ProfileFormComponent
  ],
  imports: [
    SharedModule,
    UsersRoutingModule,
    ImageCropperModule,
    TextMaskModule
  ]
})
export class UsersModule { }
