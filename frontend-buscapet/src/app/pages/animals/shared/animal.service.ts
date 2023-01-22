import { Injectable, Injector } from '@angular/core';

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

import { Animal } from './animal.model';

@Injectable({
  providedIn: 'root'
})
export class AnimalService extends BaseResourceService<Animal> {

  constructor(protected override injector: Injector) {
    super("http://localhost:3333/animals", injector, Animal.fromJson);
  }
}
