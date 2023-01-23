import { Injectable, Injector } from '@angular/core';

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

import { Adoption } from './adoption.model';

@Injectable({
  providedIn: 'root'
})
export class AdoptionService extends BaseResourceService<Adoption> {

  constructor(protected override injector: Injector) {
    super("http://localhost:3333/adoptions", injector, Adoption.fromJson);
  }
}
