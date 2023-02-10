import { Component, Injector } from '@angular/core';

import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';

import { AnimalService } from '../shared/animal.service';
import { Animal } from '../shared/animal.model';
import { VaccineService } from '../../vaccines/shared/vaccine.service';

@Component({
  selector: 'app-animal-view',
  templateUrl: './animal-view.component.html',
  styleUrls: ['./animal-view.component.css']
})
export class AnimalViewComponent extends BaseResourceFormComponent<Animal> {

  constructor(protected animalService: AnimalService, protected override injector: Injector) {
    super(injector, new Animal(), animalService, Animal.fromJson);
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({});
  }

  getSize(size: string): string {
    if (size === 'P') {
      return 'Pequeno';
    } else if (size === 'M') {
      return 'Médio';
    } else {
      return 'Grande';
    }
  }


}
