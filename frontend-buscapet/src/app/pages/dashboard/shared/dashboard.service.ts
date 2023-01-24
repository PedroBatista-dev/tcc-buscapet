import { Injectable, Injector } from '@angular/core';

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

import { Dashboard } from './dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends BaseResourceService<Dashboard> {

  constructor(protected override injector: Injector) {
    super("http://localhost:3333/", injector, Dashboard.fromJson);
  }
}
