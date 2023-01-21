import { Injectable, Injector } from '@angular/core';

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

import { Color } from './color.model';

@Injectable({
  providedIn: 'root'
})
export class ColorService extends BaseResourceService<Color> {

  constructor(protected override injector: Injector) {
    super("http://localhost:3333/colors", injector, Color.fromJson);
  }
}
