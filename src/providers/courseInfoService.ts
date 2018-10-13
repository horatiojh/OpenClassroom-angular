import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";
import { of } from "rxjs";

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

  updateCourseInfo(endpoint: string, body?: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + endpoint, body).pipe(
      tap(resp => console.log(resp)),
      catchError(this.handleErrorApi)
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
