import { Component, ElementRef, Injector, ViewChildren } from '@angular/core';
import { FormControlName, Validators } from '@angular/forms';

import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Specie } from '../shared/specie.model';
import { SpecieService } from '../shared/specie.service';

@Component({
  selector: 'app-specie-form',
  templateUrl: './specie-form.component.html',
  styleUrls: ['./specie-form.component.css']
})
export class SpecieFormComponent extends BaseResourceFormComponent<Specie> {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];

  specie: Specie = new Specie();

  constructor(protected specieService: SpecieService, protected override injector: Injector) {
    super(injector, new Specie(), specieService, Specie.fromJson);
  }

  ngAfterViewInit(): void {
    super.validarFormulario(this.formInputElements);
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(2)]]
    });
  }

  protected override creationPageTitle(): string {
    return "Cadastro de Espécie";
  }

  protected override editionPageTitle(): string {
    const specieName = this.resource.name || "";
    return `Editando Espécie: ${specieName}`;
  }
}
