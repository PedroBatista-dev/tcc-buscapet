import { Injectable, Injector } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { environment } from 'src/environments/environment';

import { Animal } from './animal.model';

@Injectable({
  providedIn: 'root'
})
export class AnimalService extends BaseResourceService<Animal> {

  constructor(protected override injector: Injector) {
    super(`${environment.apiUrl}animals`, injector, Animal.fromJson);
  }

  updateAvatar(resource: Animal, id: string): Observable<Animal> {
    const url = `${this.apiPath}/${id}/avatar`;

    return this.http.put<Animal>(url, resource, this.obterAuthHeaderJson()).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError)
    );
  }

  getFilter(name: string, sex: string, size: string, other: string): Observable<Animal[]> {
    let url = `${this.apiPath}/filter?name=${name}&sex=${sex}&size=${size}&other=${other}`;

    return this.http.get<Animal[]>(url, this.obterAuthHeaderJson()).pipe(
      map(this.jsonDataToResources.bind(this)),
      catchError(this.handleError)
    );
  }
}
