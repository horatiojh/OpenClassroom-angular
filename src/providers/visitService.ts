import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs";
import "rxjs/add/observable/throw";

import { Visit } from "../domain/visit";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable()
export class VisitService {
  baseUrl = "/api/visit";

  constructor(private httpClient: HttpClient) {}

  createVisit(visit: Visit): Observable<any> {
    let createVisitReq = { visit: visit };

    return this.httpClient
      .put<any>(this.baseUrl + "/createVisit", createVisitReq, httpOptions)
      .pipe(
        tap(_ => console.log("createVisit")),
        catchError(this.handleError<any>("createVisit"))
      );
  }

  getVisitByStaffId(staffId: string): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getVisitsBySID/" + staffId)
      .pipe(
        tap(_ => console.log(`getVisitsBySID staffId=${staffId}`)),
        catchError(this.handleError<any>(`getVisitsBySID staffId=${staffId}`))
      );
  }

  getMyVisitHistory(staffId: number): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getMyVisitHistory/" + staffId)
      .pipe(
        tap(_ => console.log(`getMyVisitHistory staffId=${staffId}`)),
        catchError(
          this.handleError<any>(`getMyVisitHistory staffId=${staffId}`)
        )
      );
  }

  updateStatus(endpoint: string, body?: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + endpoint, body).pipe(
      tap(resp => console.log(resp)),
      catchError(this.handleErrorApi)
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }

  private handleErrorApi(error: HttpErrorResponse) {
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
