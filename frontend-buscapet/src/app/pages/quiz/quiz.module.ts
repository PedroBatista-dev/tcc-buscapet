import { NgModule } from '@angular/core';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizFormComponent } from './quiz-form/quiz-form.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { TextMaskModule } from 'angular2-text-mask';


@NgModule({
  declarations: [
    QuizFormComponent
  ],
  imports: [
    SharedModule,
    QuizRoutingModule,
    TextMaskModule
  ]
})
export class QuizModule { }
