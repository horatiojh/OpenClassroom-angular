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

  getPendingVisitByStaffId(staffId: string): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getPendingVisitsBySID/" + staffId)
      .pipe(
        tap(_ => console.log(`getPendingVisitsBySID staffId=${staffId}`)),
        catchError(
          this.handleError<any>(`getPendingVisitsBySID staffId=${staffId}`)
        )
      );
  }

  getConfirmedVisitByStaffId(staffId: string): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getConfirmedVisitsBySID/" + staffId)
      .pipe(
        tap(_ => console.log(`getConfirmedVisitsBySID staffId=${staffId}`)),
        catchError(
          this.handleError<any>(`getConfirmedVisitsBySID staffId=${staffId}`)
        )
      );
  }

  getCancelledVisitByStaffId(staffId: string): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getCancelledVisitsBySID/" + staffId)
      .pipe(
        tap(_ => console.log(`getCancelledVisitsBySID staffId=${staffId}`)),
        catchError(
          this.handleError<any>(`getCancelledVisitsBySID staffId=${staffId}`)
        )
      );
  }

  getMyPendingVisitHistory(staffId: number): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getMyPendingVisitHistory/" + staffId)
      .pipe(
        tap(_ => console.log(`getMyPendingVisitHistory staffId=${staffId}`)),
        catchError(
          this.handleError<any>(`getMyPendingVisitHistory staffId=${staffId}`)
        )
      );
  }

  getMyConfirmedVisitHistory(staffId: number): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getMyConfirmedVisitHistory/" + staffId)
      .pipe(
        tap(_ => console.log(`getMyConfirmedVisitHistory staffId=${staffId}`)),
        catchError(
          this.handleError<any>(`getMyConfirmedVisitHistory staffId=${staffId}`)
        )
      );
  }

  getMyCancelledVisitHistory(staffId: number): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getMyCancelledVisitHistory/" + staffId)
      .pipe(
        tap(_ => console.log(`getMyCancelledVisitHistory staffId=${staffId}`)),
        catchError(
          this.handleError<any>(`getMyCancelledVisitHistory staffId=${staffId}`)
        )
      );
  }

  updateStatus(endpoint: string, body?: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + endpoint, body).pipe(
      tap(resp => console.log(resp)),
      catchError(this.handleErrorApi)
    );
  }

  getVisitByVisitId(visitId: number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/getVisit/" + visitId).pipe(
      tap(_ => console.log(`getVisit visitId=${visitId}`)),
      catchError(this.handleError<any>(`getVisit visitId=${visitId}`))
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
