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

import { Date } from "../domain/date";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable()
export class DateService {
  baseUrl = "/api/date";

  constructor(private httpClient: HttpClient) {}

  getAvailDateByTimetableId(timetableId: number): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getAvailDates/" + timetableId)
      .pipe(
        tap(_ => console.log(`getAvailDates timetableId=${timetableId}`)),
        catchError(
          this.handleError<any>(`getAvailDates timetableId=${timetableId}`)
        )
      );
  }

  getArchivedDateByTimetableId(timetableId: number): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getArchivedDates/" + timetableId)
      .pipe(
        tap(_ => console.log(`getArchivedDates timetableId=${timetableId}`)),
        catchError(
          this.handleError<any>(`getArchivedDates timetableId=${timetableId}`)
        )
      );
  }

  getDateByDateId(dateId: number): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getDate/" + dateId)
      .pipe(
        tap(_ => console.log(`getDate dateId=${dateId}`)),
        catchError(this.handleError<any>(`getDate dateId=${dateId}`))
      );
  }

  updateDate(date: Date): Observable<any> {
    let updateDateReq = { date: date };

    return this.httpClient
      .post<any>(this.baseUrl + "/updateDate", updateDateReq, httpOptions)
      .pipe(
        tap(_ => console.log(`updateDate id=${date.id}`)),
        catchError(this.handleError<any>(`updateDate id=${date.id}`))
      );
  }

  createDate(date: Date): Observable<any> {
    let createDateReq = { date: date };

    return this.httpClient
      .put<any>(this.baseUrl + "/createDate", createDateReq, httpOptions)
      .pipe(
        tap(_ => console.log("createDate")),
        catchError(this.handleError<any>("createDate"))
      );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
