import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageUtils } from 'src/app/shared/utils/localstorage';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  localStorageUtils = new LocalStorageUtils();

  constructor(private router: Router){}

  logout(confirm: boolean): void {
    if(confirm) {
      this.localStorageUtils.limparDadosLocaisUsuario();
      this.router.navigate(['/users/login']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
}
