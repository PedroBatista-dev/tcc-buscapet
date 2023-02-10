import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageUtils } from 'src/app/shared/utils/localstorage';


@Injectable({
  providedIn: 'root'
})
export class AnimalFiltroGuard implements CanActivate {

    localStorageUtils = new LocalStorageUtils();

    constructor(private router: Router){}

    canActivate() {
        if(this.localStorageUtils.obterIsOng() === 'true'){
            this.router.navigate(['/animais']);
        }

        return true;
    }

}
