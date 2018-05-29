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

@Injectable()
export class DateService {
  baseUrl = "/api/date";

  constructor(private httpClient: HttpClient) {}

  getAvailDateByTimetableId(timetableId: number): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getAvailDates/" + timetableId)
      .pipe(
        tap(_ => console.log(`getAvailDates timetableId=${timetableId}`)),
        catchError(this.handleError<any>(`getAvailDates timetableId=${timetableId}`))
      );
  }

  getArchivedDateByTimetableId(timetableId: number): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getArchivedDates/" + timetableId)
      .pipe(
        tap(_ => console.log(`getArchivedDates timetableId=${timetableId}`)),
        catchError(this.handleError<any>(`getArchivedDates timetableId=${timetableId}`))
      );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
