import { Injectable, Injector } from '@angular/core';

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { environment } from 'src/environments/environment';

import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService extends BaseResourceService<User> {

  constructor(protected override injector: Injector) {
    super(`${environment.apiUrl}sessions`, injector, User.fromJson);
  }
}
