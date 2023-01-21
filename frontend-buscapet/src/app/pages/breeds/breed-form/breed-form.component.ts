import { Component, ElementRef, Injector, ViewChildren } from '@angular/core';
import { FormControlName, Validators } from '@angular/forms';

import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Breed } from '../shared/breed.model';
import { BreedService } from '../shared/breed.service';

@Component({
  selector: 'app-breed-form',
  templateUrl: './breed-form.component.html',
  styleUrls: ['./breed-form.component.css']
})
export class BreedFormComponent extends BaseResourceFormComponent<Breed> {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];

  breed: Breed = new Breed();

  constructor(protected breedService: BreedService, protected override injector: Injector) {
    super(injector, new Breed(), breedService, Breed.fromJson);
  }

  ngAfterViewInit(): void {
    super.validarFormulario(this.formInputElements);
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(2)]],
      specie_id: [null, [Validators.required]]
    });
  }

  protected override creationPageTitle(): string {
    return "Cadastro de Raça";
  }

  protected override editionPageTitle(): string {
    const breedName = this.resource.name || "";
    return `Editando Raça: ${breedName}`;
  }
}
