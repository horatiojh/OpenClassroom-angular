import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/throw';

@Injectable()
export class CourseService {

    baseUrl = "/api/course";

    constructor(private httpClient: HttpClient) {
    }

    getAllCourses(): Observable<any> {
        return this.httpClient.get<any>(this.baseUrl + "/getAllRecords");
    }
}
