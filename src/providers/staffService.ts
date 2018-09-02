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

  createStaff(staff: Staff): Observable<any> {
    let createStaffReq = { staff: staff };

    return this.httpClient
      .put<any>(this.baseUrl + "/createStaff", createStaffReq, httpOptions)
      .pipe(
        tap(_ => console.log("createStaff")),
        catchError(this.handleError<any>("createStaff"))
      );
  }

  updateStaff(staff: Staff): Observable<any> {
    let updateStaffReq = { staff: staff };

    return this.httpClient
      .post<any>(this.baseUrl + "/updateStaff", updateStaffReq, httpOptions)
      .pipe(
        tap(_ => console.log(`updateStaff id=${staff.id}`)),
        catchError(this.handleError<any>(`updateStaff id=${staff.id}`))
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

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
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
