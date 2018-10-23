import { Component, OnInit } from "@angular/core";
import { Message } from "primeng/primeng";
import { Router } from "@angular/router";

import { LogMonitor } from "src/domain/logMonitor";

import { BreadcrumbService } from "src/app/breadcrumb.service";
import { LogService } from "src/providers/logService";
import { ShareService } from "src/providers/shareService";

@Component({
  selector: "app-logger",
  templateUrl: "./logger.component.html",
  styleUrls: ["./logger.component.css"]
})
export class LoggerComponent implements OnInit {
  msgs: Message[] = [];

  // for datatable
  cols: any[];
  logMonitors: LogMonitor[];

  constructor(
    private breadcrumbService: BreadcrumbService,
    private logService: LogService,
    private shareService: ShareService,
    private router: Router
  ) {
    this.breadcrumbService.setItems([{ label: "" }]);
  }

  ngOnInit() {
    //for datatable
    this.cols = [
      { field: "logDate", header: "Date", width: "12%" },
      { field: "numOfErrorLogs", header: "Error Logs", width: "12%" },
      { field: "numOfInfoLogs", header: "Info Logs", width: "12%" },
      { field: "totalNumOfLogs", header: "Total Logs", width: "12%" }
    ];

    this.logService.getAllLogMonitorRecords().subscribe(response => {
      this.logMonitors = response.logMonitors;
    });
  }

  viewAllLogs(rowData) {
    this.shareService.setValue("loggerId", rowData.id);
    this.shareService.setValue("type", "all");
    this.router.navigate(["/log"]);
  }

  viewAllInfoLogs(rowData) {
    this.shareService.setValue("loggerId", rowData.id);
    this.shareService.setValue("type", "info");
    this.router.navigate(["/log"]);
  }

  viewAllErrorLogs(rowData) {
    this.shareService.setValue("loggerId", rowData.id);
    this.shareService.setValue("type", "error");
    this.router.navigate(["/log"]);
  }
}
