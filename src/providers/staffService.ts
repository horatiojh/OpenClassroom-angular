import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";

@Injectable()
export class StaffService {

  baseUrl = "/api/staff";

  constructor(private httpClient: HttpClient) {}

  getAllStaffs(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/getAllRecords");
  }
}
