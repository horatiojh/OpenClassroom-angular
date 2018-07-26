import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs";
import "rxjs/add/observable/throw";

import { IFeedback } from "../domain/iFeedback";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable()
export class IFeedbackService {
  baseUrl = "/api/iFeedback";

  constructor(private httpClient: HttpClient) {}

  createIFeedback(iFeedback: IFeedback): Observable<any> {
    let createIFeedbackReq = { iFeedback: iFeedback };

    return this.httpClient
      .put<any>(
        this.baseUrl + "/createIFeedback",
        createIFeedbackReq,
        httpOptions
      )
      .pipe(
        tap(_ => console.log("createIFeedback")),
        catchError(this.handleError<any>("createIFeedback"))
      );
  }

  getIFeedbackByIFeedbackId(iFeedbackId: number): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getIFeedback/" + iFeedbackId)
      .pipe(
        tap(_ => console.log(`getIFeedback iFeedbackId=${iFeedbackId}`)),
        catchError(
          this.handleError<any>(`getIFeedback iFeedbackId=${iFeedbackId}`)
        )
      );
  }

  getVFeedbackByVisitId(visitId: number): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getIFeedbackByVID/" + visitId)
      .pipe(
        tap(_ => console.log(`getIFeedbackByVID visitId=${visitId}`)),
        catchError(
          this.handleError<any>(`getIFeedbackByVID visitId=${visitId}`)
        )
      );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
