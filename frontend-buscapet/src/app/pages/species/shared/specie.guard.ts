import { Injectable } from '@angular/core';
import { CanDeactivate, CanActivate, Router } from '@angular/router';
import { LocalStorageUtils } from 'src/app/shared/utils/localstorage';
import { SpecieFormComponent } from '../specie-form/specie-form.component';


@Injectable({
  providedIn: 'root'
})
export class SpecieGuard implements CanDeactivate<SpecieFormComponent>, CanActivate {

    localStorageUtils = new LocalStorageUtils();

    constructor(private router: Router){}

    canDeactivate(component: SpecieFormComponent) {
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
