import { Injectable, Injector } from '@angular/core';

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { environment } from 'src/environments/environment';

import { Breed } from './breed.model';

@Injectable({
  providedIn: 'root'
})
export class BreedService extends BaseResourceService<Breed> {

  constructor(protected override injector: Injector) {
    super(`${environment.apiUrl}breeds`, injector, Breed.fromJson);
  }
}
