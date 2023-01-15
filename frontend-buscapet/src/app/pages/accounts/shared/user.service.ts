import { Injectable, Injector } from '@angular/core';

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseResourceService<User> {

  constructor(protected override injector: Injector) {
    super("http://localhost:3333/users", injector, User.fromJson);
  }
}
