import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";

@Injectable()
export class ClassroomService {
  baseUrl = "/api/classroom";

  constructor(private httpClient: HttpClient) {}

  getAllClassrooms(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/getAllRecords");
  }
}
