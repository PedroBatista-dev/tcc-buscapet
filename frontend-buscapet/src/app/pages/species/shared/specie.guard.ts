import { Injectable } from '@angular/core';
import { CanDeactivate, CanActivate, Router } from '@angular/router';
import { LocalStorageUtils } from 'src/app/shared/utils/localstorage';
import { SpecieFormComponent } from '../specie-form/specie-form.component';


@Injectable({
  providedIn: 'root'
})
export class SpecieGuard implements CanDeactivate<SpecieFormComponent> {

    localStorageUtils = new LocalStorageUtils();

    constructor(private router: Router){}

    canDeactivate(component: SpecieFormComponent) {
        if(component.mudancasNaoSalvas) {
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
