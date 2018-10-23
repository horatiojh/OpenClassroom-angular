import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { catchError, tap } from "rxjs/operators";
import "rxjs/add/observable/throw";

@Injectable()
export class LogService {
  baseUrl = "/api/log";

  constructor(private httpClient: HttpClient) {}

  getAllLogMonitorRecords(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/getAllLogMonitorRecords");
  }

  getLogsByLogMonitorId(monitorId: number): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getLogs/" + monitorId)
      .pipe(
        tap(_ => console.log(`getLogs monitorId=${monitorId}`)),
        catchError(this.handleError<any>(`getLogs monitorId=${monitorId}`))
      );
  }

  getErrorLogsByLogMonitorId(monitorId: number): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getErrorLogs/" + monitorId)
      .pipe(
        tap(_ => console.log(`getErrorLogs monitorId=${monitorId}`)),
        catchError(this.handleError<any>(`getErrorLogs monitorId=${monitorId}`))
      );
  }

  getInfoLogsByLogMonitorId(monitorId: number): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getInfoLogs/" + monitorId)
      .pipe(
        tap(_ => console.log(`getInfoLogs monitorId=${monitorId}`)),
        catchError(this.handleError<any>(`getInfoLogs monitorId=${monitorId}`))
      );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      return Observable.throw(error);
    };
  }
}
