import { Component, OnInit } from "@angular/core";

import { Message, ConfirmationService } from "primeng/primeng";

import { BreadcrumbService } from "../../../breadcrumb.service";
import { VisitService } from "../../../../providers/visitService";
import { StaffService } from "../../../../providers/staffService";

import { Visit } from "../../../../domain/visit";
import { Staff } from "../../../../domain/staff";

@Component({
  selector: "app-profViewVisitHistory",
  templateUrl: "./prof_view_visit_history.component.html",
  styleUrls: ["./prof_view_visit_history.component.css"]
})
export class ProfViewVisitHistoryComponent implements OnInit {
  // for datatable
  iCols: any[];
  vCols: any[];
  iConfirmedVisit: Visit[];
  iPendingVisit: Visit[];
  vConfirmedVisit: Visit[];
  vPendingVisit: Visit[];
  staff: Staff;
  staffIdStr: string;
  staffId: number;
  visitId: number;

  // for components
  msgs: Message[] = [];

  constructor(
    private breadcrumbService: BreadcrumbService,
    private visitService: VisitService,
    private staffService: StaffService,
    private confirmationService: ConfirmationService
  ) {
    this.breadcrumbService.setItems([{ label: "" }]);
  }

  ngOnInit() {
    this.staffId = Number(sessionStorage.getItem("staffId"));

    this.iCols = [
      { field: "visitorName", header: "Visitor", width: "20%" },
      { field: "moduleGroup", header: "Group", width: "10%" },
      { field: "visitDate", header: "Date", width: "10%" },
      { field: "startTime", header: "Start", width: "10%" },
      { field: "endTime", header: "End", width: "10%" },
      { field: "weekDay", header: "Day", width: "10%" }
    ];

    this.vCols = [
      { field: "moduleTitle", header: "Module Title", width: "20%" },
      { field: "moduleGroup", header: "Group", width: "10%" },
      { field: "visitDate", header: "Date", width: "10%" },
      { field: "startTime", header: "Start", width: "10%" },
      { field: "endTime", header: "End", width: "10%" },
      { field: "weekDay", header: "Day", width: "10%" }
    ];

    this.staffService.getStaffByStaffId(this.staffId).subscribe(response => {
      if (response != null && typeof response.staff != undefined) {
        this.staff = response.staff;

        this.staffIdStr = this.staff.staffId;

        this.visitService
          .getPendingVisitByStaffId(this.staffIdStr)
          .subscribe(response => {
            if (response != null && typeof response.visits != undefined) {
              this.iPendingVisit = response.visits;
            } else {
              this.msgs.push({
                severity: "error",
                summary: "An error has occurred while processing the request",
                detail: ""
              });
            }
          });

        this.visitService
          .getConfirmedVisitByStaffId(this.staffIdStr)
          .subscribe(response => {
            if (response != null && typeof response.visits != undefined) {
              this.iConfirmedVisit = response.visits;
            } else {
              this.msgs.push({
                severity: "error",
                summary: "An error has occurred while processing the request",
                detail: ""
              });
            }
          });
      } else {
        this.msgs.push({
          severity: "error",
          summary: "An error has occurred while processing the request",
          detail: ""
        });
      }
    });

    this.visitService
      .getMyPendingVisitHistory(this.staffId)
      .subscribe(response => {
        if (response != null && typeof response.visits != undefined) {
          this.vPendingVisit = response.visits;
        } else {
          this.msgs.push({
            severity: "error",
            summary: "An error has occurred while processing the request",
            detail: ""
          });
        }
      });

    this.visitService
      .getMyConfirmedVisitHistory(this.staffId)
      .subscribe(response => {
        if (response != null && typeof response.visits != undefined) {
          this.vConfirmedVisit = response.visits;
        } else {
          this.msgs.push({
            severity: "error",
            summary: "An error has occurred while processing the request",
            detail: ""
          });
        }
      });
  }

  instructorConfirmDialog(rowDate) {
    this.msgs = [];
    this.confirmationService.confirm({
      message: "Are you sure that you want to confirm it?",
      header: "Confirmation",
      icon: "fa fa-question-circle",
      accept: () => {
        this.instructorConfirm(rowDate);
      },
      reject: () => {}
    });
  }

  instructorCancelDialog(rowDate) {
    this.msgs = [];
    this.confirmationService.confirm({
      message: "Are you sure that you want to cancel it?",
      header: "Confirmation",
      icon: "fa fa-question-circle",
      accept: () => {
        this.instructorCancel(rowDate);
      },
      reject: () => {}
    });
  }

  visitorCancelDialog(rowDate) {
    this.msgs = [];
    this.confirmationService.confirm({
      message: "Are you sure that you want to cancel it?",
      header: "Confirmation",
      icon: "fa fa-question-circle",
      accept: () => {
        this.visitorCancel(rowDate);
      },
      reject: () => {}
    });
  }

  instructorConfirm(rowData) {
    let endpoint = "/updateStatus";
    let body = {
      visitId: String(rowData.id),
      status: "confirmed"
    };

    this.visitService.updateStatus(endpoint, body).subscribe(
      response => {
        this.msgs.push({
          severity: "info",
          summary: "Successfully Confirmed!",
          detail: ""
        });

        setTimeout(function() {
          location.reload();
        }, 300);
      },
      error => {
        this.msgs.push({
          severity: "error",
          summary: "HTTP " + error.status,
          detail: error.error.message
        });
      }
    );
  }

  instructorCancel(rowData) {}

  visitorCancel(rowData) {}
}
