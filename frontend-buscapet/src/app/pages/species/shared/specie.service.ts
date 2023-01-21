import { Injectable, Injector } from '@angular/core';

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

import { Specie } from './specie.model';

@Injectable({
  providedIn: 'root'
})
export class SpecieService extends BaseResourceService<Specie> {

  constructor(protected override injector: Injector) {
    super("http://localhost:3333/species", injector, Specie.fromJson);
  }
}
