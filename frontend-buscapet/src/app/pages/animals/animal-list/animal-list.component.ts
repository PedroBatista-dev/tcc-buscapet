import { Component, Injector } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';

import { Animal } from '../shared/animal.model';
import { AnimalService } from '../shared/animal.service';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.css']
})
export class AnimalListComponent extends BaseResourceListComponent<Animal> {

  constructor(private animalService: AnimalService, protected override injector: Injector) {
    super(animalService, injector);
  }

}
