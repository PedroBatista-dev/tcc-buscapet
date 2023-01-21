import { Component, Injector } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';

import { Specie } from '../shared/specie.model';
import { SpecieService } from '../shared/specie.service';

@Component({
  selector: 'app-specie-list',
  templateUrl: './specie-list.component.html',
  styleUrls: ['./specie-list.component.css']
})
export class SpecieListComponent extends BaseResourceListComponent<Specie> {

  constructor(private specieService: SpecieService, protected override injector: Injector) {
    super(specieService, injector);
  }

}
