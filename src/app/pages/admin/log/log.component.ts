import { Component, OnInit } from "@angular/core";
import { Message } from "primeng/api";

import { Log } from "src/domain/log";
import { LogService } from "src/providers/logService";
import { ShareService } from "src/providers/shareService";
import { BreadcrumbService } from "src/app/breadcrumb.service";

@Component({
  selector: "app-log",
  templateUrl: "./log.component.html",
  styleUrls: ["./log.component.css"]
})
export class LogComponent implements OnInit {
  msgs: Message[] = [];

  // for datatable
  cols: any[];
  logs: Log[];
  logMonitorId: number;
  type: string;

  constructor(
    private logService: LogService,
    private shareService: ShareService,
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbService.setItems([
      { label: "Log Management", routerLink: ["/logger"] },
      { label: "Log Details", routerLink: ["/log"] }
    ]);
  }

  ngOnInit() {
    this.cols = [
      { field: "logDateTime", header: "Time", width: "8%" },
      { field: "logType", header: "Log Type", width: "6%" },
      { field: "method", header: "Method", width: "12%" },
      { field: "message", header: "Message", width: "20%" }
    ];

    this.logMonitorId = Number(this.shareService.getValue("loggerId"));
    this.type = this.shareService.getValue("type");

    if (this.type == "all") {
      this.logService
        .getLogsByLogMonitorId(this.logMonitorId)
        .subscribe(response => {
          this.logs = response.logs;
        });
    } else if (this.type == "error") {
      this.logService
        .getErrorLogsByLogMonitorId(this.logMonitorId)
        .subscribe(response => {
          this.logs = response.logs;
        });
    } else if (this.type == "info") {
      this.logService
        .getInfoLogsByLogMonitorId(this.logMonitorId)
        .subscribe(response => {
          this.logs = response.logs;
        });
    }
  }
}
