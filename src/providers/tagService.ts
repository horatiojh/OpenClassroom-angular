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

import { Tag } from "../domain/tag";

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

  createTag(tag: Tag): Observable<any> {
    let createTagReq = { tag: tag };

    return this.httpClient
      .put<any>(this.baseUrl + "/createTag", createTagReq, httpOptions)
      .pipe(
        tap(_ => console.log("createVisit")),
        catchError(this.handleError<any>("createVisit"))
      );
  }

  getTagsByCourseId(courseId: number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/getTags/" + courseId).pipe(
      tap(_ => console.log(`getTags courseId=${courseId}`)),
      catchError(this.handleError<any>(`getTags courseId=${courseId}`))
    );
  }

  deleteTag(tagId: number): Observable<any> {
    return this.httpClient
      .delete<any>(this.baseUrl + "/deleteTag/" + "?tagId=" + tagId)
      .pipe(
        tap(_ => console.error(`deleteTag tagId=${tagId}`)),
        catchError(this.handleError<any>(`deleteTag tagId=${tagId}`))
      );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
