import { Injectable, Injector } from '@angular/core';

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { environment } from 'src/environments/environment';

import { Color } from './color.model';

@Injectable({
  providedIn: 'root'
})
export class ColorService extends BaseResourceService<Color> {

  constructor(protected override injector: Injector) {
    super(`${environment.apiUrl}colors`, injector, Color.fromJson);
  }
}
