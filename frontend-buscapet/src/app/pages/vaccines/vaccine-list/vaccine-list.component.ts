import { Component, Injector } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';

import { Vaccine } from '../shared/vaccine.model';
import { VaccineService } from '../shared/vaccine.service';

@Component({
  selector: 'app-vaccine-list',
  templateUrl: './vaccine-list.component.html',
  styleUrls: ['./vaccine-list.component.css']
})
export class VaccineListComponent extends BaseResourceListComponent<Vaccine> {

  constructor(private vaccineService: VaccineService, protected override injector: Injector) {
    super(vaccineService, injector);
  }

}
