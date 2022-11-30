import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Vaccine } from './vaccine.model';

@Injectable({
  providedIn: 'root'
})
export class VaccineService {

  private apiPath: string = "api/vaccines";

  constructor(private http: HttpClient) { }

  getAll(): Observable<Vaccine[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToVaccines)
    );
  }

  getById(id: number): Observable<Vaccine> {
    const url = `${this.apiPath}/${id}`;

    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToVaccine)
    );
  }

  create(vaccine: Vaccine): Observable<Vaccine> {
    return this.http.post(this.apiPath, vaccine).pipe(
      catchError(this.handleError),
      map(this.jsonDataToVaccine)
    );
  }

  update(vaccine: Vaccine): Observable<Vaccine> {
    const url = `${this.apiPath}/${vaccine.id}`;

    return this.http.put(url, vaccine).pipe(
      catchError(this.handleError),
      map(() => vaccine)
    );
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;

    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  private jsonDataToVaccines(jsonData: any[]): Vaccine[] {
    const vaccines: Vaccine[] = [];
    jsonData.forEach(element => vaccines.push(element as Vaccine));
    return vaccines;
  }

  private jsonDataToVaccine(jsonData: any): Vaccine {
    return jsonData as Vaccine;
  }

  private handleError(error: any): Observable<any> {
    console.log("ERRO NA REQUISIÇÃO => ", error);
    return throwError(() => error);
  }

}
