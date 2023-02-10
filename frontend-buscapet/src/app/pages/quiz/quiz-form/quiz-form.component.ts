import { Component, ElementRef, Injector, ViewChildren } from '@angular/core';
import { FormControlName, Validators } from '@angular/forms';
import * as moment from 'moment';
import { MASKS, NgBrazilValidators } from 'ng-brazil';

import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { StringUtils } from 'src/app/shared/utils/string-utils';
import { validarData } from 'src/app/shared/validators/validar-data';
import { Quiz } from '../shared/quiz.model';
import { QuizService } from '../shared/quiz.service';
import { CepConsulta } from '../shared/viacep.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.css']
})
export class QuizFormComponent extends BaseResourceFormComponent<Quiz> {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];

  public MASKS = MASKS;

  quiz: Quiz = new Quiz();

  maxDate: string = '';


  constructor(protected quizService: QuizService, protected override injector: Injector) {
    super(injector, new Quiz(), quizService, Quiz.fromJson);
  }

  override ngOnInit(): void {
    this.buildResourceForm();
    this.resourceService.getById('').subscribe({
        next: (resource) => {
          if (resource.id) {
            this.currentAction = 'editar';
            resource.birth_date = moment(resource.birth_date).utc().format('yyyy-MM-DD');
            this.resource = resource;
            this.resourceForm?.patchValue(resource);
          } else {
            this.currentAction = 'novo';
          }
        },
        error: () => {
          Swal.fire({
              title: 'Erro!',
              text: 'Ocorreu um erro no servidor, tente mais tarde.',
              icon: 'error',
              confirmButtonColor: '#44C5CD',
          });
        }
    });
  }

  ngAfterViewInit(): void {
    super.validarFormulario(this.formInputElements);
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      birth_date: [null, [Validators.required]],
      marital_status: [null, [Validators.required]],
      professional_activity: [null, [Validators.required]],
      address: [null, [Validators.required]],
      complement: [null],
      district: [null, [Validators.required]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      cep: [null, [Validators.required, NgBrazilValidators.cep]],
      profile_instragam: [null, [Validators.required]],
      for_who: [null, [Validators.required]],
      why_adopt: [null, [Validators.required]],
      average_life: [false, [Validators.required]],
      financial_conditions: [false, [Validators.required]],
    },
    {
      validators: [validarData("birth_date")],
    });
  }

  protected override creationPageTitle(): string {
    return "Cadastro de Questionário";
  }

  protected override editionPageTitle(): string {
    return `Editando Questionário`;
  }

  protected override updateResource():void {
    const resource: Quiz = this.jsonDataToResourceFn(this.resourceForm.value);
    this.quizService.update(resource).subscribe({
      next: (resource) => this.actionsForSuccess(resource),
      error: (error) => this.actionsForError(error)
    });

    this.changesNoSave = false;
  }

  buscarCep() {
    const cep = StringUtils.somenteNumeros(this.resourceForm.get('cep')!.value);
    if (cep.length < 8) return;

    this.quizService.consultarCep(cep).subscribe({
        next: (resource) => {
          this.preencherEnderecoConsulta(resource)
        },
        error: (erro) => {
          console.log(erro)
        }
    });
  }

  preencherEnderecoConsulta(cepConsulta: CepConsulta) {
    this.resourceForm.patchValue({
      address: cepConsulta.logradouro,
      district: cepConsulta.bairro,
      cep: cepConsulta.cep,
      city: cepConsulta.localidade,
      state: cepConsulta.uf
    });
  }
}
