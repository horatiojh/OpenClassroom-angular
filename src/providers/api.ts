import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";
import { catchError, tap } from "rxjs/operators";
import { Observable, of } from "rxjs";

@Injectable()
export class Api {
  public url: string = "/api/";

  constructor(public http: HttpClient) { }

  get(endpoint: string) {
    return this.http
      .get(this.url + endpoint)
      .pipe(tap(resp => console.log(resp)), catchError(this.handleError<any>('get')));
  }

  post(endpoint: string, body?: any) {
    return this.http
      .post(this.url + endpoint, body)
      .pipe(tap(resp => console.log(resp)), catchError(this.handleError<any>('post')));
  }

  put(endpoint: string, body?: any) {
    return this.http
      .put(this.url + endpoint, body)
      .pipe(tap(resp => console.log(resp)), catchError(this.handleError<any>('put')));
  }

  delete(endpoint: string) {
    return this.http
      .delete(this.url + endpoint)
      .pipe(tap(resp => console.log(resp)), catchError(this.handleError<any>('delete')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}