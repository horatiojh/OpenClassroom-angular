import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs";
import "rxjs/add/observable/throw";

@Injectable()
export class TimetableService {
  baseUrl = "/api/timetable";

  constructor(private httpClient: HttpClient) {}

  getTimetableByCourseId(courseId: number): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getTimetables/" + courseId)
      .pipe(
        tap(_ => console.log(`getTimetables courseId=${courseId}`)),
        catchError(this.handleError<any>(`getTimetables courseId=${courseId}`))
      );
  }

  getTimetableByTimetableId(timetableId: number): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getTimetable/" + timetableId)
      .pipe(
        tap(_ => console.log(`getTimetable timetableId=${timetableId}`)),
        catchError(this.handleError<any>(`getTimetable timetableId=${timetableId}`))
      );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
