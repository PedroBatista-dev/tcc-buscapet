import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  templateUrl: './form-field-error.component.html',
  styleUrls: ['./form-field-error.component.css']
})
export class FormFieldErrorComponent implements OnInit {

  @Input('form-control') formControl!: FormControl;

  constructor() { }

  ngOnInit(): void {
  }

  public get errorMessage(): string | null {
    if(this.formControl.invalid && this.formControl.touched)
      return this.getErrorMessage();
    else
      return null;
  }

  private getErrorMessage(): string | null {
    if(this.formControl.errors?.['required'])
      return "* Dado obrigatório";
    else if(this.formControl.errors?.['email'])
      return `* Formato de e-mail inválido`;
    else if(this.formControl.errors?.['minlength'])
      return `* Deve ter no mínimo ${this.formControl.errors['minlength'].requiredLength} caracteres`;
    else if(this.formControl.errors?.['maxlength'])
      return `* Deve ter no máximo ${this.formControl.errors['maxlength'].requiredLength} caracteres`;
    else if(this.formControl.errors?.['equalTo'])
      return `* As senhas não conferem`;
    else if(this.formControl.errors?.['cpf'])
      return `* CPF inválido`;
    else if(this.formControl.errors?.['cnpj'])
      return `* CNPJ inválido`;
    else
    return null;
  }

}
