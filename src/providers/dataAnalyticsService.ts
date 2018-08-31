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

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable()
export class DataAnalyticsService {
  baseUrl = "/api/data";

  constructor(private httpClient: HttpClient) {}

  getAllNonLastNumOfVisits(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/getAllNonLastNumOfVisits");
  }

  getAllNonLastNumOfVisitors(): Observable<any> {
    return this.httpClient.get<any>(
      this.baseUrl + "/getAllNonLastNumOfVisitors"
    );
  }
}
