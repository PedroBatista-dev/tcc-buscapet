import { AfterViewInit, Component, ElementRef, Injector, ViewChildren } from '@angular/core';
import { FormControlName, Validators } from '@angular/forms';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Forgot } from '../shared/forgot.model';
import { ForgotService } from '../shared/forgot.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css'],
})
export class ForgotComponent extends BaseResourceFormComponent<Forgot> implements AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];

  constructor(protected forgotService: ForgotService, protected override injector: Injector) {
    super(injector, new Forgot(), forgotService, Forgot.fromJson);
  }

  ngAfterViewInit(): void {
    super.validarFormulario(this.formInputElements);
  }

  protected buildResourceForm(): void {

    this.resourceForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

}
