import { Injectable } from '@angular/core';
import { CanDeactivate, CanActivate, Router } from '@angular/router';
import { LocalStorageUtils } from 'src/app/shared/utils/localstorage';
import { RegistrationComponent } from '../registration/registration.component';


@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanDeactivate<RegistrationComponent>, CanActivate {

    localStorageUtils = new LocalStorageUtils();

    constructor(private router: Router){}

    canDeactivate(component: RegistrationComponent) {
        if(component.changesNoSave) {
            return window.confirm('Tem certeza que deseja abandonar o preenchimento do formulário?');
        }

        return true
    }

    canActivate() {
        if (this.localStorageUtils.obterRemember() === 'nao') {
          this.localStorageUtils.limparDadosLocaisUsuario();
          return true;
        }

        if(this.localStorageUtils.obterTokenUsuario()){
            this.router.navigate(['/dashboard']);
        }

        return true;
    }

}
