import { Injectable } from '@angular/core';
import { CanDeactivate, CanActivate, Router } from '@angular/router';
import { LocalStorageUtils } from 'src/app/shared/utils/localstorage';
import { QuizFormComponent } from '../quiz-form/quiz-form.component';


@Injectable({
  providedIn: 'root'
})
export class QuizGuard implements CanDeactivate<QuizFormComponent>, CanActivate {

    localStorageUtils = new LocalStorageUtils();

    constructor(private router: Router){}

    canDeactivate(component: QuizFormComponent) {
        if(component.changesNoSave) {
            return window.confirm('Tem certeza que deseja abandonar o preenchimento do formulário?');
        }

        return true
    }

    canActivate() {
      if(this.localStorageUtils.obterIsOng() === 'true'){
        this.router.navigate(['/dashboard']);
      }

      return true;

    }

}
