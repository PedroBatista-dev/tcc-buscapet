import { Injectable, Injector } from '@angular/core';

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

import { Vaccine } from './vaccine.model';

@Injectable({
  providedIn: 'root'
})
export class VaccineService extends BaseResourceService<Vaccine> {

  constructor(protected override injector: Injector) {
    super("api/vaccines", injector, Vaccine.fromJson);
  }
}
