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
export class TagService {
  baseUrl = "/api/tag";

  constructor(private httpClient: HttpClient) {}

  getAllTags(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/getAllRecords");
  }

  createTag(endpoint: string, body?: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + endpoint, body).pipe(
      tap(resp => console.log(resp)),
      catchError(this.handleErrorApi)
    );
  }

  deleteTag(endpoint: string, body?: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + endpoint, body).pipe(
      tap(resp => console.log(resp)),
      catchError(this.handleErrorApi)
    );
  }

  getAllNonDuplicateTagsName(): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getAllNonDuplicateTagsName")
      .pipe(
        tap(_ => console.log(`getAllNonDuplicateTagsName`)),
        catchError(this.handleError<any>(`getAllNonDuplicateTagsName error`))
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
