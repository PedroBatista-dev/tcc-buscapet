import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';

import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Vaccine } from '../shared/vaccine.model';
import { VaccineService } from '../shared/vaccine.service';

@Component({
  selector: 'app-vaccine-form',
  templateUrl: './vaccine-form.component.html',
  styleUrls: ['./vaccine-form.component.css']
})
export class VaccineFormComponent extends BaseResourceFormComponent<Vaccine> {

  vaccine: Vaccine = new Vaccine();

  constructor(protected vaccineService: VaccineService, protected override injector: Injector) {
    super(injector, new Vaccine(), vaccineService, Vaccine.fromJson);
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]]
    });
  }

  protected override creationPageTitle(): string {
    return "Cadastro de Vacina";
  }

  protected override editionPageTitle(): string {
    const vaccineName = this.resource.name || "";
    return `Editando Vacina: ${vaccineName}`;
  }
}
