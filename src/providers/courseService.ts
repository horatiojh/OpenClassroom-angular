import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/throw';
import { of } from "rxjs";

@Injectable()
export class CourseService {

    baseUrl = "/api/course";

    constructor(private httpClient: HttpClient) {
    }

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
          tap(_ => console.log(`getCourse timetableId=${courseId}`)),
          catchError(
            this.handleError<any>(`getCourse timetableId=${courseId}`)
          )
        );
    }

    private handleError<T>(operation = "operation", result?: T) {
      return (error: any): Observable<T> => {
        return of(result as T);
      };
    }
}
