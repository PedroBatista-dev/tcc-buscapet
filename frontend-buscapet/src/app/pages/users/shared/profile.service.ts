import { Injectable, Injector } from '@angular/core';

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { environment } from 'src/environments/environment';

import { Profile } from './profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends BaseResourceService<Profile> {

  constructor(protected override injector: Injector) {
    super(`${environment.apiUrl}profile`, injector, Profile.fromJson);
  }
}
