import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";
import { of } from "rxjs";

import { CourseInfo } from "../domain/courseInfo";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

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

  getCourseInfoByCourseInfoId(courseInfoId: number): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getCourseInfoByCIID/" + courseInfoId)
      .pipe(
        tap(_ =>
          console.log(`getCourseInfoByCIID courseInfoId=${courseInfoId}`)
        ),
        catchError(
          this.handleError<any>(
            `getCourseInfoByCIID courseInfoId=${courseInfoId}`
          )
        )
      );
  }

  updateCourseInfo(courseInfo: CourseInfo): Observable<any> {
    let updateCourseInfoReq = { courseInfo: courseInfo };

    return this.httpClient
      .post<any>(
        this.baseUrl + "/updateCourseInfo",
        updateCourseInfoReq,
        httpOptions
      )
      .pipe(
        tap(_ => console.log(`updateCourseInfo id=${courseInfo.id}`)),
        catchError(
          this.handleError<any>(`updateCourseInfo id=${courseInfo.id}`)
        )
      );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      return Observable.throw(error);
    };
  }
}
