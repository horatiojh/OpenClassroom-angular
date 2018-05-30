import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";
import { of } from "rxjs";

@Injectable()
export class StaffService {
  baseUrl = "/api/staff";

  constructor(private httpClient: HttpClient) {}

  getAllStaffs(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/getAllRecords");
  }

  getStaffByStaffId(staffId: number): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getStaff/" + staffId)
      .pipe(
        tap(_ => console.log(`getStaff staffId=${staffId}`)),
        catchError(this.handleError<any>(`getStaff staffId=${staffId}`))
      );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
