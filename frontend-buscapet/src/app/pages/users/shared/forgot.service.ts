import { Injectable, Injector } from '@angular/core';

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { environment } from 'src/environments/environment';

import { Forgot } from './forgot.model';

@Injectable({
  providedIn: 'root'
})
export class ForgotService extends BaseResourceService<Forgot> {

  constructor(protected override injector: Injector) {
    super(`${environment.apiUrl}password/forgot`, injector, Forgot.fromJson);
  }
}
