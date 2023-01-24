import { Injectable } from '@angular/core';
import { CanDeactivate, CanActivate, Router } from '@angular/router';
import { LocalStorageUtils } from 'src/app/shared/utils/localstorage';
import { ColorFormComponent } from '../color-form/color-form.component';


@Injectable({
  providedIn: 'root'
})
export class ColorGuard implements CanDeactivate<ColorFormComponent>, CanActivate {

    localStorageUtils = new LocalStorageUtils();

    constructor(private router: Router){}

    canDeactivate(component: ColorFormComponent) {
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
