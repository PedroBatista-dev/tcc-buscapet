import { Component, Injector } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';

import { Dashboard } from '../shared/dashboard.model';
import { DashboardService } from '../shared/dashboard.service';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.css']
})
export class DashboardListComponent extends BaseResourceListComponent<Dashboard> {

  constructor(private dashboardService: DashboardService, protected override injector: Injector) {
    super(dashboardService, injector);
  }

  override ngOnInit(): void {

  }

}
