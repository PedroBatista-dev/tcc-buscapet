import { Injectable, Injector } from '@angular/core';

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { environment } from 'src/environments/environment';

import { ResetPassword } from './reset-password.model';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService extends BaseResourceService<ResetPassword> {

  constructor(protected override injector: Injector) {
    super(`${environment.apiUrl}password/reset`, injector, ResetPassword.fromJson);
  }
}
