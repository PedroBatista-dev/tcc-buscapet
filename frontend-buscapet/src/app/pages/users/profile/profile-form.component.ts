import { Component, ElementRef, Injector, ViewChildren } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MASKS, NgBrazilValidators } from 'ng-brazil';

import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { SpecieService } from '../../species/shared/specie.service';
import { User } from '../shared/user.model';
import { ProfileService } from '../shared/profile.service';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent extends BaseResourceFormComponent<User> {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];

  public MASKS = MASKS;

  edit: boolean = false;
  alter: boolean = false;
  passwordForm!: FormGroup;


  constructor(protected profileService: ProfileService, protected override injector: Injector, public specieService: SpecieService) {
    super(injector, new User(), profileService, User.fromJson);
  }

  ngAfterViewInit(): void {
    super.validarFormulario(this.formInputElements);
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      name: [{ value: null, disabled: true }],
      email: [{ value: null, disabled: true }],
      isOng: [null],
      cpf: [{ value: null, disabled: true }],
      cnpj: [{ value: null, disabled: true }],
    });

    let senha = new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(15)]);
    let senhaConfirm = new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(15), CustomValidators.equalTo(senha)]);

    this.passwordForm = this.formBuilder.group({
      old_password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      password: senha,
      password_confirmation: senhaConfirm,
    });
  }

  protected override editionPageTitle(): string {
    return `Editando Perfil: ${this.localStorage.obterUsuario()}`;
  }

  editProfile(): void {
    this.edit = true;

    this.resourceForm.get('name')?.enable();
    this.resourceForm.get('name')?.setValidators([Validators.required, Validators.minLength(3)]);
    this.resourceForm.get('name')?.updateValueAndValidity();

    this.resourceForm.get('email')?.enable();
    this.resourceForm.get('email')?.setValidators([Validators.required, Validators.email]);
    this.resourceForm.get('email')?.updateValueAndValidity();

    if (this.localStorage.obterIsOng() === 'true') {
      this.resourceForm.get('cnpj')?.enable();
      this.resourceForm.get('cnpj')?.setValidators([Validators.required, NgBrazilValidators.cnpj]);
      this.resourceForm.get('cnpj')?.updateValueAndValidity();
    } else {
      this.resourceForm.get('cpf')?.enable();
      this.resourceForm.get('cpf')?.setValidators([Validators.required, NgBrazilValidators.cpf]);
      this.resourceForm.get('cpf')?.updateValueAndValidity();
    }
  }

  cancelEdit(value: string = ''): void {
    this.edit = false;

    if (value !== 'submit')
      this.resourceForm?.patchValue(this.resource);

    this.resourceForm.get('name')?.disable();
    this.resourceForm.get('name')?.clearValidators();
    this.resourceForm.get('name')?.updateValueAndValidity();

    this.resourceForm.get('email')?.disable();
    this.resourceForm.get('email')?.clearValidators();
    this.resourceForm.get('email')?.updateValueAndValidity();

    if (this.localStorage.obterIsOng() === 'true') {
      this.resourceForm.get('cnpj')?.disable();
      this.resourceForm.get('cnpj')?.clearValidators();
      this.resourceForm.get('cnpj')?.updateValueAndValidity();
    } else {
      this.resourceForm.get('cpf')?.disable();
      this.resourceForm.get('cpf')?.clearValidators();
      this.resourceForm.get('cpf')?.updateValueAndValidity();
    }
  }

  alterPass() {
    this.alter = true;
  }

  cancelAlter(): void {
    this.alter = false;

    this.passwordForm.get('old_password')?.setValue(null);
    this.passwordForm.get('password')?.setValue(null);
    this.passwordForm.get('password_confirmation')?.setValue(null);
  }

  saveAlter(): void {
    this.resourceService.update(this.passwordForm.value, 'password').subscribe({
      next: (resource) => {
        this.actionsForSuccess(resource);
        this.cancelAlter();
      },
      error: (error) => this.actionsForError(error)
    });
  }

  override submitForm(): void {
    super.submitForm();
    this.cancelEdit('submit');
  }

}
