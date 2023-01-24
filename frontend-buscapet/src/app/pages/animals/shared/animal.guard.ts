import { Injectable } from '@angular/core';
import { CanDeactivate, CanActivate, Router } from '@angular/router';
import { LocalStorageUtils } from 'src/app/shared/utils/localstorage';
import { AnimalFormComponent } from '../animal-form/animal-form.component';


@Injectable({
  providedIn: 'root'
})
export class AnimalGuard implements CanDeactivate<AnimalFormComponent> {

    localStorageUtils = new LocalStorageUtils();

    constructor(private router: Router){}

    canDeactivate(component: AnimalFormComponent) {
        if(component.changesNoSave) {
            return window.confirm('Tem certeza que deseja abandonar o preenchimento do formulário?');
        }

        return true
    }

    // canActivate() {
    //     if (this.localStorageUtils.obterRemember() === 'nao') {
    //       this.localStorageUtils.limparDadosLocaisUsuario();
    //       return true;
    //     }

    //     if(this.localStorageUtils.obterTokenUsuario()){
    //         this.router.navigate(['/vacinas']); // mudar para dashboard
    //     }

    //     return true;
    // }

}
