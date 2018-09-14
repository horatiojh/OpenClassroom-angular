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

  getAllIFeedbackedConfirmedVisitsByStaffId(staffId: string): Observable<any> {
    return this.httpClient
      .get<any>(
        this.baseUrl + "/getAllIFeedbackedConfirmedVisitsBySID/" + staffId
      )
      .pipe(
        tap(_ =>
          console.log(
            `getAllIFeedbackedConfirmedVisitsBySID staffId=${staffId}`
          )
        ),
        catchError(
          this.handleError<any>(
            `getAllIFeedbackedConfirmedVisitsBySID staffId=${staffId}`
          )
        )
      );
  }

  getAllNonIFeedbackedConfirmedVisitsByStaffId(
    staffId: string
  ): Observable<any> {
    return this.httpClient
      .get<any>(
        this.baseUrl + "/getAllNonIFeedbackedConfirmedVisitsBySID/" + staffId
      )
      .pipe(
        tap(_ =>
          console.log(
            `getAllNonIFeedbackedConfirmedVisitsBySID staffId=${staffId}`
          )
        ),
        catchError(
          this.handleError<any>(
            `getAllNonIFeedbackedConfirmedVisitsBySID staffId=${staffId}`
          )
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

  getAllVFeedbackedConfirmedVisits(staffId: number): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getAllVFeedbackedConfirmedVisits/" + staffId)
      .pipe(
        tap(_ =>
          console.log(`getAllVFeedbackedConfirmedVisits staffId=${staffId}`)
        ),
        catchError(
          this.handleError<any>(
            `getAllVFeedbackedConfirmedVisits staffId=${staffId}`
          )
        )
      );
  }

  getAllNonVFeedbackedConfirmedVisits(staffId: number): Observable<any> {
    return this.httpClient
      .get<any>(
        this.baseUrl + "/getAllNonVFeedbackedConfirmedVisits/" + staffId
      )
      .pipe(
        tap(_ =>
          console.log(`getAllNonVFeedbackedConfirmedVisits staffId=${staffId}`)
        ),
        catchError(
          this.handleError<any>(
            `getAllNonVFeedbackedConfirmedVisits staffId=${staffId}`
          )
        )
      );
  }

  updateVStatus(endpoint: string, body?: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + endpoint, body).pipe(
      tap(resp => console.log(resp)),
      catchError(this.handleErrorApi)
    );
  }

  updateIStatus(endpoint: string, body?: any): Observable<any> {
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

  updateVFeedbackSubmitted(endpoint: string, body?: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + endpoint, body).pipe(
      tap(resp => console.log(resp)),
      catchError(this.handleErrorApi)
    );
  }

  updateIFeedbackSubmitted(endpoint: string, body?: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + endpoint, body).pipe(
      tap(resp => console.log(resp)),
      catchError(this.handleErrorApi)
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      return Observable.throw(error);
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
