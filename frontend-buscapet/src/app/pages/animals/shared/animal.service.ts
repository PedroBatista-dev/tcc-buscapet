import { Injectable, Injector } from '@angular/core';

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { environment } from 'src/environments/environment';

import { Animal } from './animal.model';

@Injectable({
  providedIn: 'root'
})
export class AnimalService extends BaseResourceService<Animal> {

  constructor(protected override injector: Injector) {
    super(`${environment.apiUrl}animals`, injector, Animal.fromJson);

  }
}
