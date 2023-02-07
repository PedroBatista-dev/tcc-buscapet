import { Injectable, Injector } from '@angular/core';
import { catchError, Observable } from 'rxjs';

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { environment } from 'src/environments/environment';

import { Quiz } from './quiz.model';
import { CepConsulta } from './viacep.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService extends BaseResourceService<Quiz> {

  constructor(protected override injector: Injector) {
    super(`${environment.apiUrl}quiz`, injector, Quiz.fromJson);
  }

  consultarCep(cep: string): Observable<CepConsulta> {
    return this.http
      .get<CepConsulta>(`https://viacep.com.br/ws/${cep}/json/`)
      .pipe(catchError(this.handleError))
  }
}
