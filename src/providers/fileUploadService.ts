import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/throw';

@Injectable()
export class FileUploadService {

    private baseUrl: string = "/api/upload/";

    constructor(private httpClient: HttpClient) {
    }

    uploadClassroom(data: FormData): Observable<any> {
        return this.httpClient
            .post<any>(this.baseUrl + "classroom", data, )
            .pipe(tap(resp => console.log(resp)), catchError(this.handleError));
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