import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";

@Injectable()
export class LogService {
  baseUrl = "/api/log";

  constructor(private httpClient: HttpClient) {}

  getAllLogMonitorRecords(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/getAllLogMonitorRecords");
  }
}
