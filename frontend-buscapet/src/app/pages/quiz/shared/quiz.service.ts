import { Injectable, Injector } from '@angular/core';

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

import { Quiz } from './quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService extends BaseResourceService<Quiz> {

  constructor(protected override injector: Injector) {
    super("http://localhost:3333/quiz", injector, Quiz.fromJson);
  }
}
