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
import { Timetable } from "../domain/timetable";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

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
        catchError(
          this.handleError<any>(`getTimetable timetableId=${timetableId}`)
        )
      );
  }

  updateTimetable(timetable: Timetable): Observable<any> {
    let updateTimetableReq = { "timetable": timetable };

    return this.httpClient
      .post<any>(
        this.baseUrl + "/updateTimetable",
        updateTimetableReq,
        httpOptions
      )
      .pipe(
        tap(_ => console.log(`updateTimetable id=${timetable.id}`)),
        catchError(this.handleError<any>(`updateTimetable id=${timetable.id}`))
      );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
