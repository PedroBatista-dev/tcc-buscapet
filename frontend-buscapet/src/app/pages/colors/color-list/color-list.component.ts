import { Component, Injector } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';

import { Color } from '../shared/color.model';
import { ColorService } from '../shared/color.service';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.css']
})
export class ColorListComponent extends BaseResourceListComponent<Color> {

  constructor(private colorService: ColorService, protected override injector: Injector) {
    super(colorService, injector);
  }

}
