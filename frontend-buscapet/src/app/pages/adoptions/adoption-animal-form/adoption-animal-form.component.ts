import { Component, Injector } from '@angular/core';

import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';

import { AnimalService } from '../../animals/shared/animal.service';
import { Animal } from '../../animals/shared/animal.model';
import { VaccineService } from '../../vaccines/shared/vaccine.service';

@Component({
  selector: 'app-adoption-animal-form',
  templateUrl: './adoption-animal-form.component.html',
  styleUrls: ['./adoption-animal-form.component.css']
})
export class AdoptionAnimalFormComponent extends BaseResourceFormComponent<Animal> {

  constructor(protected animalService: AnimalService, protected override injector: Injector, private vaccineService: VaccineService) {
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
