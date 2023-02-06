import { NgModule } from '@angular/core';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizFormComponent } from './quiz-form/quiz-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    QuizFormComponent
  ],
  imports: [
    SharedModule,
    QuizRoutingModule
  ]
})
export class QuizModule { }
