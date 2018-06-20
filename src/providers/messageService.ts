import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs";
import "rxjs/add/observable/throw";

import { MessageEntity } from "../domain/message";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable()
export class MessageService {
  baseUrl = "/api/message";

  constructor(private httpClient: HttpClient) {}

  createMessage(message: MessageEntity): Observable<any> {
    let createMessageReq = { message: message };

    return this.httpClient
      .put<any>(this.baseUrl + "/createMessage", createMessageReq, httpOptions)
      .pipe(
        tap(_ => console.log("createMessage")),
        catchError(this.handleError<any>("createMessage"))
      );
  }

  getUnreadMessagesByStaffId(staffId: number): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getUnreadMessages/" + staffId)
      .pipe(
        tap(_ => console.log(`getUnreadMessages staffId=${staffId}`)),
        catchError(
          this.handleError<any>(`getUnreadMessages staffId=${staffId}`)
        )
      );
  }

  getReadMessagesByStaffId(staffId: number): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getReadMessages/" + staffId)
      .pipe(
        tap(_ => console.log(`getReadMessages staffId=${staffId}`)),
        catchError(this.handleError<any>(`getReadMessages staffId=${staffId}`))
      );
  }

  markRead(endpoint: string, body?: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + endpoint, body).pipe(
      tap(resp => console.log(resp)),
      catchError(this.handleErrorApi)
    );
  }

  markUnread(endpoint: string, body?: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + endpoint, body).pipe(
      tap(resp => console.log(resp)),
      catchError(this.handleErrorApi)
    );
  }

  getMessageByMessageId(messageId: number): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + "/getMessage/" + messageId)
      .pipe(
        tap(_ => console.log(`getMessage messageId=${messageId}`)),
        catchError(this.handleError<any>(`getMessage messageId=${messageId}`))
      );
  }

  deleteMessage(messageId: number): Observable<any> {
    return this.httpClient
      .delete<any>(this.baseUrl + "/deleteMessage/" + "?messageId=" + messageId)
      .pipe(
        tap(_ => console.error(`deleteMessage messageId=${messageId}`)),
        catchError(
          this.handleError<any>(`deleteMessage messageId=${messageId}`)
        )
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
      console.error(
        "An HTTP error has occurred: " +
          `HTTP ${error.status}: ${error.error.message}`
      );
    }

    return Observable.throw(errMsg);
  }
}
