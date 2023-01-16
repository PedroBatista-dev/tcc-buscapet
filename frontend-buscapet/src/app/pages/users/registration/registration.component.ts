import { Component, Injector } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgBrazilValidators, MASKS } from 'ng-brazil';
import { CustomValidators } from 'ng2-validation';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { User } from '../../users/shared/user.model';
import { UserService } from '../../users/shared/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent extends BaseResourceFormComponent<User> {

  public MASKS = MASKS;

  constructor(protected userService: UserService, protected override injector: Injector) {
    super(injector, new User(), userService, User.fromJson);
  }

  protected buildResourceForm(): void {
    let senha = new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(15)]);
    let senhaConfirm = new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(15), CustomValidators.equalTo(senha)]);

    this.resourceForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      password: senha,
      passwordConfirmation: senhaConfirm,
      isOng: [true, [Validators.required]],
      cpf: [null],
      cnpj: [null, [Validators.required, NgBrazilValidators.cnpj]],
    });
  }

  protected override creationPageTitle(): string {
    return "Cadastro de Usuário";
  }

  validateDocument() {
    if (this.resourceForm.get('isOng')?.value) {
      this.resourceForm.get('cpf')?.setValue(null);
      this.resourceForm.get('cpf')?.clearValidators();
      this.resourceForm.get('cpf')?.updateValueAndValidity();

      this.resourceForm.get('cnpj')?.setValidators([Validators.required, NgBrazilValidators.cnpj]);
      this.resourceForm.get('cnpj')?.updateValueAndValidity();
    } else {
      this.resourceForm.get('cnpj')?.setValue(null);
      this.resourceForm.get('cnpj')?.clearValidators();
      this.resourceForm.get('cnpj')?.updateValueAndValidity();

      this.resourceForm.get('cpf')?.setValidators([Validators.required, NgBrazilValidators.cpf]);
      this.resourceForm.get('cpf')?.updateValueAndValidity();
    }
  }
}
