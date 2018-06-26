import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs";
import "rxjs/add/observable/throw";

import { Feedback } from "../domain/feedback";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable()
export class FeedbackService {
  baseUrl = "/api/feedback";

  constructor(private httpClient: HttpClient) {}

  createFeedback(feedback: Feedback): Observable<any> {
    let createFeedbackReq = { feedback: feedback };

    return this.httpClient
      .put<any>(
        this.baseUrl + "/createFeedback",
        createFeedbackReq,
        httpOptions
      )
      .pipe(
        tap(_ => console.log("createFeedback")),
        catchError(this.handleError<any>("createFeedback"))
      );
  }

  getFeedbackByFeedbackId(feedbackId: number): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getFeedback/" + feedbackId)
      .pipe(
        tap(_ => console.log(`getFeedback feedbackId=${feedbackId}`)),
        catchError(
          this.handleError<any>(`getFeedback feedbackId=${feedbackId}`)
        )
      );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
