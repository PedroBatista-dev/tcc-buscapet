import { Component } from '@angular/core';
import { LocalStorageUtils } from './shared/utils/localstorage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  localStorage = new LocalStorageUtils();
}
