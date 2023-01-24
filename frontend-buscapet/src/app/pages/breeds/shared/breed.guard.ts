import { Injectable } from '@angular/core';
import { CanDeactivate, CanActivate, Router } from '@angular/router';
import { LocalStorageUtils } from 'src/app/shared/utils/localstorage';
import { BreedFormComponent } from '../breed-form/breed-form.component';


@Injectable({
  providedIn: 'root'
})
export class BreedGuard implements CanDeactivate<BreedFormComponent>, CanActivate {

    localStorageUtils = new LocalStorageUtils();

    constructor(private router: Router){}

    canDeactivate(component: BreedFormComponent) {
        if(component.changesNoSave) {
            return window.confirm('Tem certeza que deseja abandonar o preenchimento do formulário?');
        }

        return true
    }

    canActivate() {
      if(this.localStorageUtils.obterIsOng() === 'false'){
        this.router.navigate(['/dashboard']);
      }

      return true;

    }

}
