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

import { DateEntity } from "../domain/date";

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
    return this.httpClient.get<any>(this.baseUrl + "/getDate/" + dateId).pipe(
      tap(_ => console.log(`getDate dateId=${dateId}`)),
      catchError(this.handleError<any>(`getDate dateId=${dateId}`))
    );
  }

  updateDateStatus(endpoint: string, body?: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + endpoint, body).pipe(
      tap(resp => console.log(resp)),
      catchError(this.handleErrorApi)
    );
  }

  createDate(endpoint: string, body?: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + endpoint, body).pipe(
      tap(resp => console.log(resp)),
      catchError(this.handleErrorApi)
    );
  }

  getAvailDateByCourseId(courseId: number): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getAvailDatesByCID/" + courseId)
      .pipe(
        tap(_ => console.log(`getAvailDatesByCID courseId=${courseId}`)),
        catchError(
          this.handleError<any>(`getAvailDatesByCID courseId=${courseId}`)
        )
      );
  }

  getArchivedDateByCourseId(courseId: number): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getArchivedDatesByCID/" + courseId)
      .pipe(
        tap(_ => console.log(`getArchivedDatesByCID courseId=${courseId}`)),
        catchError(
          this.handleError<any>(`getArchivedDatesByCID courseId=${courseId}`)
        )
      );
  }

  getVacateDateByTimetableIdDateStr(
    timetableId: number,
    dateStr: string
  ): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getVacateDates/" + timetableId + "/" + dateStr)
      .pipe(
        tap(_ => console.log(`getVacateDates timetableId=${timetableId}`)),
        catchError(
          this.handleError<any>(`getVacateDates timetableId=${timetableId}`)
        )
      );
  }

  getVacateDateByTimetableId(timetableId: number): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getVacateDates/" + timetableId)
      .pipe(
        tap(_ => console.log(`getVacateDates timetableId=${timetableId}`)),
        catchError(
          this.handleError<any>(`getVacateDates timetableId=${timetableId}`)
        )
      );
  }

  updateIsBooked(endpoint: string, body?: any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + endpoint, body)
      .pipe(catchError(this.handleErrorApi));
  }

  getBookedDateByTimetableId(timetableId: number): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getBookedDates/" + timetableId)
      .pipe(
        tap(_ => console.log(`getBookedDates timetableId=${timetableId}`)),
        catchError(
          this.handleError<any>(`getBookedDates timetableId=${timetableId}`)
        )
      );
  }

  getBookedDateByCourseId(courseId: number): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getBookedDatesByCID/" + courseId)
      .pipe(
        tap(_ => console.log(`getBookedDatesByCID courseId=${courseId}`)),
        catchError(
          this.handleError<any>(`getBookedDatesByCID courseId=${courseId}`)
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
