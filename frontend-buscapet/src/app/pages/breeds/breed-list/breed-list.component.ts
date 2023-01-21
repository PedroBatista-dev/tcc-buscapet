import { Component, Injector } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';

import { Breed } from '../shared/breed.model';
import { BreedService } from '../shared/breed.service';

@Component({
  selector: 'app-breed-list',
  templateUrl: './breed-list.component.html',
  styleUrls: ['./breed-list.component.css']
})
export class BreedListComponent extends BaseResourceListComponent<Breed> {

  constructor(private breedService: BreedService, protected override injector: Injector) {
    super(breedService, injector);
  }

}
