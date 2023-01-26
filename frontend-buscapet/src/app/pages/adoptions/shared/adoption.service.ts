import { Injectable, Injector } from '@angular/core';

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { environment } from 'src/environments/environment';

import { Adoption } from './adoption.model';

@Injectable({
  providedIn: 'root'
})
export class AdoptionService extends BaseResourceService<Adoption> {

  constructor(protected override injector: Injector) {
    super(`${environment.apiUrl}adoptions`, injector, Adoption.fromJson);
  }
}
