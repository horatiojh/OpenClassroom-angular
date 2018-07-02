import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";
import { of } from "rxjs";

@Injectable()
export class CourseInfoService {
  baseUrl = "/api/courseInfo";

  constructor(private httpClient: HttpClient) {}

  getCourseInfoByModuleCode(moduleCode: string): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getCourseInfo/" + moduleCode)
      .pipe(
        tap(_ => console.log(`getCourseInfo moduleCode=${moduleCode}`)),
        catchError(
          this.handleError<any>(`getCourseInfo moduleCode=${moduleCode}`)
        )
      );
  }

  getAllCourseInfo(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/getAllRecords");
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
