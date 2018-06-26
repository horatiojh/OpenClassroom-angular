import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";

@Injectable()
export class Api {
  public url: string = "/api/";

  constructor(public http: HttpClient) {}

  get(endpoint: string) {
    return this.http.get(this.url + endpoint).pipe(
      tap(resp => console.log(resp)),
      catchError(this.handleError)
    );
  }

  post(endpoint: string, body?: any): Observable<any> {
    return this.http.post<any>(this.url + endpoint, body).pipe(
      tap(resp => console.log(resp)),
      catchError(this.handleError)
    );
  }

  put(endpoint: string, body?: any): Observable<any> {
    return this.http.put<any>(this.url + endpoint, body).pipe(
      tap(resp => console.log(resp)),
      catchError(this.handleError)
    );
  }

  delete(endpoint: string) {
    return this.http.delete(this.url + endpoint).pipe(
      tap(resp => console.log(resp)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errMsg = error.message || "Server error";

    if (error.error instanceof ErrorEvent) {
      console.error("An unknown error has occurred:", error.error.message);
    } else {
      console.error(
        "An HTTP error has occurred: " +
          `HTTP ${error.status}: ${error.error.message}`
      );
    }

    return Observable.throw(errMsg);
  }
}
