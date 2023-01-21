import { Component, ElementRef, Injector, ViewChildren } from '@angular/core';
import { FormControlName, Validators } from '@angular/forms';

import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Color } from '../shared/color.model';
import { ColorService } from '../shared/color.service';

@Component({
  selector: 'app-color-form',
  templateUrl: './color-form.component.html',
  styleUrls: ['./color-form.component.css']
})
export class ColorFormComponent extends BaseResourceFormComponent<Color> {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];

  color: Color = new Color();

  constructor(protected colorService: ColorService, protected override injector: Injector) {
    super(injector, new Color(), colorService, Color.fromJson);
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
    return "Cadastro de Cor";
  }

  protected override editionPageTitle(): string {
    const colorName = this.resource.name || "";
    return `Editando Cor: ${colorName}`;
  }
}
