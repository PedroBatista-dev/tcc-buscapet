import { Component, ElementRef, Injector, ViewChildren } from '@angular/core';
import { FormControlName, Validators } from '@angular/forms';

import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Quiz } from '../shared/quiz.model';
import { QuizService } from '../shared/quiz.service';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.css']
})
export class QuizFormComponent extends BaseResourceFormComponent<Quiz> {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];

  quiz: Quiz = new Quiz();

  constructor(protected quizService: QuizService, protected override injector: Injector) {
    super(injector, new Quiz(), quizService, Quiz.fromJson);
  }

  override ngOnInit(): void {
    this.buildResourceForm();
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
      complement: [null, [Validators.required]],
      district: [null, [Validators.required]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      cep: [null, [Validators.required]],
      profile_instragam: [null, [Validators.required]],
      for_who: [null, [Validators.required]],
      why_adopt: [null, [Validators.required]],
      average_life: [null, [Validators.required]],
      financial_conditions: [null, [Validators.required]],
    });
  }

  protected override creationPageTitle(): string {
    return "Cadastro de Vacina";
  }

  protected override editionPageTitle(): string {
    return `Editando Quiz`;
  }
}
