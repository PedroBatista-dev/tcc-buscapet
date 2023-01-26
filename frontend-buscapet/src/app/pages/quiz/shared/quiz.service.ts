import { Injectable, Injector } from '@angular/core';

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { environment } from 'src/environments/environment';

import { Quiz } from './quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService extends BaseResourceService<Quiz> {

  constructor(protected override injector: Injector) {
    super(`${environment.apiUrl}quiz`, injector, Quiz.fromJson);
  }
}
