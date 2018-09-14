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

import { Course } from "../domain/course";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable()
export class CourseService {
  baseUrl = "/api/course";

  constructor(private httpClient: HttpClient) {}

  getAllCourses(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/getAllRecords");
  }

  getCoursesByStaffId(staffId: number): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getCourses/" + staffId)
      .pipe(
        tap(_ => console.log(`getCourses staffId=${staffId}`)),
        catchError(this.handleError<any>(`getCourses staffId=${staffId}`))
      );
  }

  getCourseByCourseId(courseId: number): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getCourse/" + courseId)
      .pipe(
        tap(_ => console.log(`getCourse courseId=${courseId}`)),
        catchError(this.handleError<any>(`getCourse courseId=${courseId}`))
      );
  }

  updateCourse(course: Course): Observable<any> {
    let updateCourseReq = { course: course };

    return this.httpClient
      .post<any>(this.baseUrl + "/updateCourse", updateCourseReq, httpOptions)
      .pipe(
        tap(_ => console.log(`updateCourse id=${course.id}`)),
        catchError(this.handleError<any>(`updateCourse id=${course.id}`))
      );
  }

  getCourseByTimetableId(timetableId: number): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getCourseByTID/" + timetableId)
      .pipe(
        tap(_ => console.log(`getCourseByTID timetableId=${timetableId}`)),
        catchError(
          this.handleError<any>(`getCourseByTID timetableId=${timetableId}`)
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
