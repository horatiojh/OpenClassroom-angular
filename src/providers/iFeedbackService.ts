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
export class IFeedbackService {
  baseUrl = "/api/iFeedback";

  constructor(private httpClient: HttpClient) {}

  createIFeedback(endpoint: string, body?: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + endpoint, body).pipe(
      tap(resp => console.log(resp)),
      catchError(this.handleErrorApi)
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

  getIFeedbackByVisitId(visitId: number): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getIFeedbackByVID/" + visitId)
      .pipe(
        tap(_ => console.log(`getIFeedbackByVID visitId=${visitId}`)),
        catchError(
          this.handleError<any>(`getIFeedbackByVID visitId=${visitId}`)
        )
      );
  }

  getIFeedbackByVFeedbackId(vFeedbackId: number): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getIFeedbackByVFID/" + vFeedbackId)
      .pipe(
        tap(_ => console.log(`getIFeedbackByVFID vFeedbackId=${vFeedbackId}`)),
        catchError(
          this.handleError<any>(`getIFeedbackByVFID vFeedbackId=${vFeedbackId}`)
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
