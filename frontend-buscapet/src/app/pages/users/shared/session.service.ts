import { Injectable, Injector } from '@angular/core';

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { environment } from 'src/environments/environment';

import { Session } from './session.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService extends BaseResourceService<Session> {

  constructor(protected override injector: Injector) {
    super(`${environment.apiUrl}sessions`, injector, Session.fromJson);
  }
}
