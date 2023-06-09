import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  apiUrl: string = 'http://localhost:3000/characters';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) {}

  list(): Observable<any> {
    return this.httpClient.get(this.apiUrl).pipe(catchError(this.handleError));
  }

  getItem(id: any): Observable<any> {
    return this.httpClient
      .get(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  create(data: any): Observable<any> {
    return this.httpClient
      .post(this.apiUrl, data)
      .pipe(catchError(this.handleError));
  }

  update(id: any, data: any): Observable<any> {
    return this.httpClient
      .put(`${this.apiUrl}/${id}`, data)
      .pipe(catchError(this.handleError));
  }
  delete(id: any): Observable<any> {
    return this.httpClient
      .delete(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  filterbyName(name: any): Observable<any> {
    return this.httpClient
      .get(`${this.apiUrl}?name_like=${name}`)
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
