import { BaseResourceModel } from "../models/base-resource.model";

import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injector } from "@angular/core";

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LocalStorageUtils } from "../utils/localstorage";

export abstract class BaseResourceService<T extends BaseResourceModel> {

  protected http!: HttpClient;
  localStorage = new LocalStorageUtils();

  constructor(protected apiPath: string, protected injector: Injector, protected jsonDataToResourceFn: (jsonData: any) => T) {
    this.http = injector.get(HttpClient);
   }

  getAll(name: string, status: string): Observable<T[]> {
    let url = this.apiPath;

     if (name) {
      url = `${this.apiPath}/?name=${name}`;
    }

    if (status) {
      url = `${this.apiPath}/?status=${status}`;
    }

    return this.http.get<T[]>(url, this.obterAuthHeaderJson()).pipe(
      map(this.jsonDataToResources.bind(this)),
      catchError(this.handleError)
    );
  }

  getById(id: string): Observable<T> {
    const url = `${this.apiPath}/${id}`;

    return this.http.get<T>(url, this.obterAuthHeaderJson()).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError)
    );
  }

  create(resource: T): Observable<T> {
    return this.http.post<T>(this.apiPath, resource, this.obterAuthHeaderJson()).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError)
    );
  }

  update(resource: T, id: string): Observable<T> {
    const url = `${this.apiPath}/${id}`;

    return this.http.put<T>(url, resource, this.obterAuthHeaderJson()).pipe(
      map(() => resource),
      catchError(this.handleError)
    );
  }

  delete(id: string): Observable<any> {
    const url = `${this.apiPath}/${id}`;

    return this.http.delete(url, this.obterAuthHeaderJson()).pipe(
      map(() => null),
      catchError(this.handleError)
    );
  }

  protected jsonDataToResources(jsonData: T[]): T[] {
    const resources: T[] = [];
    jsonData.forEach(
      element => resources.push(this.jsonDataToResourceFn(element))
    );
    return resources;
  }

  protected jsonDataToResource(jsonData: any): T {
    return this.jsonDataToResourceFn(jsonData);
  }

  protected handleError(error: HttpErrorResponse): Observable<any> {
    console.log("ERRO NA REQUISIÇÃO => ", error);
    return throwError(() => error);
  }

  protected obterAuthHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.localStorage.obterTokenUsuario()}`
            })
        };
    }
}
