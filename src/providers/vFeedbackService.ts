import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs";
import "rxjs/add/observable/throw";

import { VFeedback } from "../domain/vFeedback";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable()
export class VFeedbackService {
  baseUrl = "/api/vFeedback";

  constructor(private httpClient: HttpClient) {}

  createVFeedback(vFeedback: VFeedback): Observable<any> {
    let createVFeedbackReq = { vFeedback: vFeedback };

    return this.httpClient
      .put<any>(
        this.baseUrl + "/createVFeedback",
        createVFeedbackReq,
        httpOptions
      )
      .pipe(
        tap(_ => console.log("createVFeedback")),
        catchError(this.handleError<any>("createVFeedback"))
      );
  }

  getVFeedbackByVFeedbackId(vFeedbackId: number): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getVFeedback/" + vFeedbackId)
      .pipe(
        tap(_ => console.log(`getVFeedback vFeedbackId=${vFeedbackId}`)),
        catchError(
          this.handleError<any>(`getVFeedback vFeedbackId=${vFeedbackId}`)
        )
      );
  }

  getVFeedbackByVisitId(visitId: number): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getVFeedbackByVID/" + visitId)
      .pipe(
        tap(_ => console.log(`getVFeedbackByVID visitId=${visitId}`)),
        catchError(
          this.handleError<any>(`getVFeedbackByVID visitId=${visitId}`)
        )
      );
  }

  getVFeedbackByIFeedbackId(iFeedbackId: number): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getVFeedbackByIFID/" + iFeedbackId)
      .pipe(
        tap(_ => console.log(`getVFeedbackByIFID iFeedbackId=${iFeedbackId}`)),
        catchError(
          this.handleError<any>(`getVFeedbackByIFID iFeedbackId=${iFeedbackId}`)
        )
      );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
