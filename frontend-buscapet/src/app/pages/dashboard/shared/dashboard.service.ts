import { Injectable, Injector } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { environment } from 'src/environments/environment';

import { Dashboard } from './dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends BaseResourceService<Dashboard> {

  constructor(protected override injector: Injector) {
    super(`${environment.apiUrl}animals`, injector, Dashboard.fromJson);
  }

  getDashboard(text: string): Observable<Dashboard[]> {
    const url = `${this.apiPath}/${text}`;

    return this.http.get<Dashboard[]>(url, this.obterAuthHeaderJson()).pipe(
      map(this.jsonDataToResources.bind(this)),
      catchError(this.handleError)
    );
  }
}
