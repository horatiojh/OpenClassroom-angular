import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";
import { of } from "rxjs";

import { Rating } from "../domain/rating";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable()
export class RatingService {
  baseUrl = "/api/rating";

  constructor(private httpClient: HttpClient) {}

  createRating(rating: Rating): Observable<any> {
    let createRatingReq = { rating: rating };

    return this.httpClient
      .put<any>(this.baseUrl + "/createRating", createRatingReq, httpOptions)
      .pipe(
        tap(_ => console.log("createVisit")),
        catchError(this.handleError<any>("createVisit"))
      );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      return Observable.throw(error);
    };
  }
}
