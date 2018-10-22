import { Component, OnInit } from "@angular/core";
import { Message } from "primeng/primeng";
import { LogMonitor } from "src/domain/logMonitor";
import { BreadcrumbService } from "src/app/breadcrumb.service";
import { LogService } from "src/providers/logService";

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
    private logService: LogService
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
}
