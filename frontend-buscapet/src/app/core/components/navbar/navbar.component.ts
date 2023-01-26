import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageUtils } from 'src/app/shared/utils/localstorage';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isCollapsed: boolean = true;
  localStorageUtils = new LocalStorageUtils();
  avatar: string = 'https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp';

  constructor(private router: Router){}

}
