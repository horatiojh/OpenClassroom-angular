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

import { Staff } from "../domain/staff";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable()
export class StaffService {
  baseUrl = "/api/staff";

  constructor(private httpClient: HttpClient) {}

  getAllEnrolledStaffs(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/getAllEnrolledStaffs");
  }

  getAllNonEnrolledStaffs(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/getAllNonEnrolledStaffs");
  }

  getAllInstructors(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/getAllInstructors");
  }

  getStaffByStaffId(staffId: number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/getStaff/" + staffId).pipe(
      tap(_ => console.log(`getStaff staffId=${staffId}`)),
      catchError(this.handleError<any>(`getStaff staffId=${staffId}`))
    );
  }

  getStaffByStaffIdStr(staffId: string): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getStaffBySIDStr/" + staffId)
      .pipe(
        tap(_ => console.log(`getStaffBySIDStr staffId=${staffId}`)),
        catchError(this.handleError<any>(`getStaffBySIDStr staffId=${staffId}`))
      );
  }

  createStaff(endpoint: string, body?: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + endpoint, body).pipe(
      tap(resp => console.log(resp)),
      catchError(this.handleErrorApi)
    );
  }

  updateStaff(endpoint: string, body?: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + endpoint, body).pipe(
      tap(resp => console.log(resp)),
      catchError(this.handleErrorApi)
    );
  }

  deleteStaff(staffId: number): Observable<any> {
    return this.httpClient
      .delete<any>(this.baseUrl + "/deleteStaff/" + "?staffId=" + staffId)
      .pipe(
        tap(_ => console.error(`deleteStaff staffId=${staffId}`)),
        catchError(this.handleError<any>(`deleteStaff staffId=${staffId}`))
      );
  }

  updateIsEnrolled(endpoint: string, body?: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + endpoint, body).pipe(
      tap(resp => console.log(resp)),
      catchError(this.handleErrorApi)
    );
  }

  getStaffsByModuleCode(moduleCode: string): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getStaffsByModuleCode/" + moduleCode)
      .pipe(
        catchError(
          this.handleError<any>(`getStaffsByModuleCode moduleCode=${moduleCode}`)
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
      errMsg = error.error;

      console.error(
        "An HTTP error has occurred: " +
          `HTTP ${error.status}: ${error.error.message}`
      );
    }

    return Observable.throw(errMsg);
  }
}
