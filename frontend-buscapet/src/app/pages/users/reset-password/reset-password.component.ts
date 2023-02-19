import { AfterViewInit, Component, ElementRef, Injector, ViewChildren } from '@angular/core';
import { FormControl, FormControlName, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { ResetPassword } from '../shared/reset-password.model';
import { ResetPasswordService } from '../shared/reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent extends BaseResourceFormComponent<ResetPassword> implements AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];

  constructor(protected resetPasswordService: ResetPasswordService, protected override injector: Injector) {
    super(injector, new ResetPassword(), resetPasswordService, ResetPassword.fromJson);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.route.queryParams
      .subscribe(params => {
        this.resourceForm.get('token')?.setValue(params['token']);
      }
    );
  }

  ngAfterViewInit(): void {
    super.validarFormulario(this.formInputElements);
  }

  protected buildResourceForm(): void {
    let senha = new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(15)]);
    let senhaConfirm = new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(15), CustomValidators.equalTo(senha)]);

    this.resourceForm = this.formBuilder.group({
      token: [null, [Validators.required]],
      password: senha,
      passwordConfirmation: senhaConfirm,
    });
  }

}
