import { Injectable } from '@angular/core';
import { CanDeactivate, CanActivate, Router } from '@angular/router';
import { LocalStorageUtils } from 'src/app/shared/utils/localstorage';
import { VaccineFormComponent } from '../vaccine-form/vaccine-form.component';


@Injectable({
  providedIn: 'root'
})
export class VaccineGuard implements CanDeactivate<VaccineFormComponent>, CanActivate {

    localStorageUtils = new LocalStorageUtils();

    constructor(private router: Router){}

    canDeactivate(component: VaccineFormComponent) {
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
