import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs";
import "rxjs/add/observable/throw";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable()
export class VFeedbackService {
  baseUrl = "/api/vFeedback";

  constructor(private httpClient: HttpClient) {}

  createVFeedback(endpoint: string, body?: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + endpoint, body).pipe(
      tap(resp => console.log(resp)),
      catchError(this.handleErrorApi)
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
