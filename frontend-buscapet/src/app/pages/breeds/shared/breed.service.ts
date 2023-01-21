import { Injectable, Injector } from '@angular/core';

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

import { Breed } from './breed.model';

@Injectable({
  providedIn: 'root'
})
export class BreedService extends BaseResourceService<Breed> {

  constructor(protected override injector: Injector) {
    super("http://localhost:3333/breeds", injector, Breed.fromJson);
  }
}
