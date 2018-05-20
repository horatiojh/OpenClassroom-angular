import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()

export class FileUploadService {

    baseUrl = "/api/upload";

    constructor(private httpClient: HttpClient) {
    }

    createNewProduct(data: FormData): Observable<any> {
        return this.httpClient.post<any>(this.baseUrl + "/classroom", data).pipe
        (
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {

        let errMsg = error.message || 'Server error';

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