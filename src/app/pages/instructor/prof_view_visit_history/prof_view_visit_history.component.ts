import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";

import { Message, ConfirmationService } from "primeng/primeng";

import { BreadcrumbService } from "../../../breadcrumb.service";
import { VisitService } from "../../../../providers/visitService";
import { StaffService } from "../../../../providers/staffService";
import { MsgService } from "../../../../providers/msgService";
import { VFeedbackService } from "../../../../providers/vFeedbackService";
import { IFeedbackService } from "../../../../providers/iFeedbackService";

import { Visit } from "../../../../domain/visit";
import { Staff } from "../../../../domain/staff";
import { MessageEntity } from "../../../../domain/message";
import { QuestionRating } from "../../../../wrapper/questionRating";
import { VFeedback } from "../../../../domain/vFeedback";
import { IFeedback } from "../../../../domain/iFeedback";

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
  iCancelledVisit: Visit[];
  vConfirmedVisit: Visit[];
  vPendingVisit: Visit[];
  vCancelledVisit: Visit[];
  staff: Staff;
  staffIdStr: string;
  staffId: number;
  visitId: number;

  // for components
  msgs: Message[] = [];

  // for cancellation form dialog
  iMsgContent: string;
  iMsgTitle: string;
  iMsgDate: string = "";
  iDisplay: boolean = false;
  iDialogVisitId: number;
  iCancelMsg: MessageEntity;
  iVisit: Visit;
  iStaffId: number;
  iStaff: Staff;

  vMsgContent: string;
  vMsgTitle: string;
  vMsgDate: string = "";
  vDisplay: boolean = false;
  vDialogVisitId: number;
  vCancelMsg: MessageEntity;
  vVisit: Visit;
  vStaffId: number;
  vStaff: Staff;

  // for css
  instructorCancelDialogBtnStyle: SafeStyle;
  visitorCancelDialogBtnStyle: SafeStyle;
  visitorLeaveDialogBtnStyle: SafeStyle;
  instructorLeaveDialogBtnStyle: SafeStyle;

  // for visitor feedback form dialog
  vfDisplay: boolean = false;
  vfDialogVisitId: number;
  vfQuestions: string[] = [];
  vfQRatings: string[] = [];
  vfComment: string;
  vfQuestionRatings: QuestionRating[] = [];
  vFeedback: VFeedback;
  vfVisit: Visit;
  vQuestionAAns: string = "";
  vQuestionBAns: string = "";
  vQuestionCAns: string = "";
  vQuestions: string[] = [];
  vAns: string[] = [];

  // for instructor feedback form dialog
  ifDisplay: boolean = false;
  ifDialogVisitId: number;
  ifQuestions: string[] = [];
  ifQRatings: string[] = [];
  ifComment: string;
  ifQuestionRatings: QuestionRating[] = [];
  iFeedback: IFeedback;
  ifVisit: Visit;
  iQuestionAAns: string;

  // for view visitor's feedback
  vvFeedback: VFeedback;
  vvfDialogVisitId: number;
  vvfDisplay: boolean = false;
  vvQuestionAAns: string = "";
  vvQuestionBAns: string = "";
  vvQuestionCAns: string = "";
  vvfQuestionRatings: QuestionRating[] = [];
  vvOpenQuestions: string[] = [];
  vvOpenAns: string[] = [];
  vvfRQuestions: string[] = [];
  vvfQRatings: string[] = [];

  constructor(
    private breadcrumbService: BreadcrumbService,
    private visitService: VisitService,
    private staffService: StaffService,
    private confirmationService: ConfirmationService,
    private domSanitizer: DomSanitizer,
    private msgService: MsgService,
    private vFeedbackService: VFeedbackService,
    private iFeedbackService: IFeedbackService
  ) {
    this.breadcrumbService.setItems([{ label: "" }]);

    this.iMsgTitle = "Observation Cancelled";
    this.vMsgTitle = "Observation Cancelled";
  }

  ngOnInit() {
    // for create visitor feedback
    this.vQuestions.push(
      "What is one thing that worked particularly well in this class?"
    );

    this.vQuestions.push(
      "What is one suggestion the instructor can implement for future classes?"
    );

    this.vQuestions.push("Any other comments for the instructor");

    // for feedback form dialog
    this.vfQuestionRatings.push({
      question: "This visit caused me to reflect on my own teaching.",
      rating: 0
    });

    this.vfQuestionRatings.push({
      question:
        "As a result of the visit, I anticipate making changes to my classes.",
      rating: 0
    });

    this.ifQuestionRatings.push({
      question: "The visit caused me to reflect on my teaching.",
      rating: 0
    });

    this.ifQuestionRatings.push({
      question:
        "As a result of the visit, I will implement changes to how I teach this course.",
      rating: 0
    });

    // for feedback form dialog css
    let visitorLeaveDialogStyle = "width:160px;height:35px";
    this.visitorLeaveDialogBtnStyle = this.domSanitizer.bypassSecurityTrustStyle(
      visitorLeaveDialogStyle
    );

    let instructorLeaveDialogStyle = "width:160px;height:35px";
    this.instructorLeaveDialogBtnStyle = this.domSanitizer.bypassSecurityTrustStyle(
      instructorLeaveDialogStyle
    );

    // for cancel visit dialog css
    let instructorCancelDialogStyle = "width:120px";
    this.instructorCancelDialogBtnStyle = this.domSanitizer.bypassSecurityTrustStyle(
      instructorCancelDialogStyle
    );

    let visitorCancelDialogStyle = "width:120px";
    this.visitorCancelDialogBtnStyle = this.domSanitizer.bypassSecurityTrustStyle(
      visitorCancelDialogStyle
    );

    // for datatable
    this.staffId = Number(sessionStorage.getItem("sessionStaffId"));

    this.iCols = [
      { field: "visitorName", header: "Observer", width: "20%" },
      { field: "moduleCode", header: "Code", width: "9%" },
      { field: "visitDate", header: "Date", width: "10%" },
      { field: "startTime", header: "Start", width: "9%" },
      { field: "endTime", header: "End", width: "8%" },
      { field: "weekDay", header: "Day", width: "8%" }
    ];

    this.vCols = [
      { field: "moduleCode", header: "Module Code", width: "12%" },
      { field: "instructorName", header: "Instructor", width: "20%" },
      { field: "visitDate", header: "Date", width: "9%" },
      { field: "startTime", header: "Start", width: "8%" },
      { field: "endTime", header: "End", width: "7%" },
      { field: "weekDay", header: "Day", width: "7%" }
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

        this.visitService
          .getCancelledVisitByStaffId(this.staffIdStr)
          .subscribe(response => {
            if (response != null && typeof response.visits != undefined) {
              this.iCancelledVisit = response.visits;
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

          console.log(this.vPendingVisit);
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

    this.visitService
      .getMyCancelledVisitHistory(this.staffId)
      .subscribe(response => {
        if (response != null && typeof response.visits != undefined) {
          this.vCancelledVisit = response.visits;
        } else {
          this.msgs.push({
            severity: "error",
            summary: "An error has occurred while processing the request",
            detail: ""
          });
        }
      });
  }

  instructorConfirmDialog(rowData) {
    this.msgs = [];
    this.confirmationService.confirm({
      message: "Are you sure that you want to confirm?",
      header: "Confirmation",
      icon: "fa fa-question-circle",
      accept: () => {
        this.instructorConfirm(rowData);
      },
      reject: () => {}
    });
  }

  instructorCancelDialog(rowData) {
    this.msgs = [];
    this.confirmationService.confirm({
      message: "Are you sure that you want to cancel?",
      header: "Confirmation",
      icon: "fa fa-question-circle",
      accept: () => {
        this.showInstructorCancelDialog(rowData);
      },
      reject: () => {}
    });
  }

  visitorConfirmDialog(rowData) {
    this.msgs = [];
    this.confirmationService.confirm({
      message: "Are you sure that you want to confirm?",
      header: "Confirmation",
      icon: "fa fa-question-circle",
      accept: () => {
        this.visitorConfirm(rowData);
      },
      reject: () => {}
    });
  }

  visitorCancelDialog(rowData) {
    this.msgs = [];
    this.confirmationService.confirm({
      message: "Are you sure that you want to cancel?",
      header: "Confirmation",
      icon: "fa fa-question-circle",
      accept: () => {
        this.showVisitorCancelDialog(rowData);
      },
      reject: () => {}
    });
  }

  instructorConfirm(rowData) {
    this.msgs = [];
    let endpoint = "/updateIStatus";
    let body = {
      visitId: String(rowData.id),
      iStatus: "confirmed"
    };

    this.visitService.updateIStatus(endpoint, body).subscribe(
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

  visitorConfirm(rowData) {
    this.msgs = [];
    let endpoint = "/updateVStatus";
    let body = {
      visitId: String(rowData.id),
      vStatus: "confirmed"
    };

    this.visitService.updateVStatus(endpoint, body).subscribe(
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

  showInstructorCancelDialog(rowData) {
    this.iDisplay = true;
    this.iDialogVisitId = rowData.id;
  }

  showVisitorCancelDialog(rowData) {
    this.vDisplay = true;
    this.vDialogVisitId = rowData.id;
  }

  instructorCancel() {
    this.msgs = [];
    this.visitService
      .getVisitByVisitId(this.iDialogVisitId)
      .subscribe(response => {
        this.iVisit = response.visit;
        this.iStaffId = this.iVisit.visitorId;

        this.staffService
          .getStaffByStaffId(this.iStaffId)
          .subscribe(response => {
            this.iStaff = response.staff;

            this.iCancelMsg = new MessageEntity();
            this.iCancelMsg.messageDate = this.iMsgDate;
            this.iCancelMsg.title = this.iMsgTitle;
            this.iCancelMsg.content = this.iMsgContent;
            this.iCancelMsg.staff = this.iStaff;
            this.iCancelMsg.visitId = this.iDialogVisitId;

            this.msgService
              .createMessage(this.iCancelMsg)
              .subscribe(response => {
                this.msgs.push({
                  severity: "info",
                  summary: "Successfully Cancelled!",
                  detail: ""
                });
              });
          });
      });

    let iendpoint = "/updateIStatus";
    let ibody = {
      visitId: String(this.iDialogVisitId),
      iStatus: "cancelled"
    };

    this.visitService.updateIStatus(iendpoint, ibody).subscribe(
      response => {
        let vendpoint = "/updateVStatus";
        let vbody = {
          visitId: String(this.iDialogVisitId),
          vStatus: "cancelled"
        };

        this.visitService.updateVStatus(vendpoint, vbody).subscribe(
          response => {},
          error => {
            this.msgs.push({
              severity: "error",
              summary: "HTTP " + error.status,
              detail: error.error.message
            });
          }
        );

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

    this.iDisplay = false;
  }

  visitorCancel() {
    this.msgs = [];
    this.visitService
      .getVisitByVisitId(this.vDialogVisitId)
      .subscribe(response => {
        this.vVisit = response.visit;
        this.vStaffId = this.vVisit.instructorId;

        this.staffService
          .getStaffByStaffId(this.vStaffId)
          .subscribe(response => {
            this.vStaff = response.staff;

            this.vCancelMsg = new MessageEntity();
            this.vCancelMsg.messageDate = this.vMsgDate;
            this.vCancelMsg.title = this.vMsgTitle;
            this.vCancelMsg.content = this.vMsgContent;
            this.vCancelMsg.staff = this.vStaff;
            this.vCancelMsg.visitId = this.vDialogVisitId;

            this.msgService
              .createMessage(this.vCancelMsg)
              .subscribe(response => {
                this.msgs.push({
                  severity: "info",
                  summary: "Successfully Cancelled!",
                  detail: ""
                });
              });
          });
      });

    let iendpoint = "/updateIStatus";
    let ibody = {
      visitId: String(this.vDialogVisitId),
      iStatus: "cancelled"
    };

    this.visitService.updateIStatus(iendpoint, ibody).subscribe(
      response => {
        let vendpoint = "/updateVStatus";
        let vbody = {
          visitId: String(this.vDialogVisitId),
          vStatus: "cancelled"
        };

        this.visitService.updateVStatus(vendpoint, vbody).subscribe(
          response => {},
          error => {
            this.msgs.push({
              severity: "error",
              summary: "HTTP " + error.status,
              detail: error.error.message
            });
          }
        );

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

    this.vDisplay = false;
  }

  showVisitorFeedbackFormDialog(rowData) {
    this.vfDisplay = true;
    this.vfDialogVisitId = rowData.id;
  }

  showInstructorFeedbackFormDialog(rowData) {
    this.ifDisplay = true;
    this.ifDialogVisitId = rowData.id;
  }

  showViewVisitorFeedbackDetailsDialog(rowData) {
    this.vvfDisplay = true;
    this.vvfDialogVisitId = rowData.id;

    this.vFeedbackService
      .getVFeedbackByVisitId(this.vvfDialogVisitId)
      .subscribe(response => {
        this.vvFeedback = response.vFeedback;

        this.vvOpenQuestions = this.vvFeedback.oQuestions;
        this.vvOpenAns = this.vvFeedback.oAns;
        this.vvfRQuestions = this.vvFeedback.rQuestions;
        this.vvfQRatings = this.vvFeedback.qRating;

        // question & rating
        for (let i = 0; i < this.vvfRQuestions.length; i++) {
          this.vvfQuestionRatings.push({
            question: this.vvfRQuestions[i],
            rating: Number(this.vvfQRatings[i])
          });
        }

        // open questions
        this.vvQuestionAAns = this.vvOpenAns[0];
        this.vvQuestionBAns = this.vvOpenAns[1];
        this.vvQuestionCAns = this.vvOpenAns[2];
      });
  }

  visitorLeaveFeedback() {
    this.msgs = [];

    for (let i = 0; i < this.vfQuestionRatings.length; i++) {
      this.vfQuestions.push(this.vfQuestionRatings[i].question);
      this.vfQRatings.push(String(this.vfQuestionRatings[i].rating));
    }

    this.vAns.push(this.vQuestionAAns);
    this.vAns.push(this.vQuestionBAns);
    this.vAns.push(this.vQuestionCAns);

    this.vFeedback = new VFeedback();

    this.vFeedback.rQuestions = this.vfQuestions;
    this.vFeedback.qRating = this.vfQRatings;
    this.vFeedback.oQuestions = this.vQuestions;
    this.vFeedback.oAns = this.vAns;
    this.vFeedback.comment = this.vfComment;

    this.visitService
      .getVisitByVisitId(this.vfDialogVisitId)
      .subscribe(response => {
        this.vfVisit = response.visit;
        this.vFeedback.visit = this.vfVisit;

        this.vFeedbackService
          .createVFeedback(this.vFeedback)
          .subscribe(response => {
            this.msgs.push({
              severity: "info",
              summary: "Successfully Submitted!",
              detail: ""
            });

            this.vfDisplay = false;

            let endpoint = "/updateVFeedbackSubmitted";
            let body = {
              visitId: String(this.vfDialogVisitId),
              vFeedbackSubmitted: true
            };

            this.visitService
              .updateVFeedbackSubmitted(endpoint, body)
              .subscribe(response => {
                setTimeout(function() {
                  location.reload();
                }, 300);
              });
          });
      });
  }

  instructorLeaveFeedback() {
    this.msgs = [];

    for (let i = 0; i < this.ifQuestionRatings.length; i++) {
      this.ifQuestions.push(this.ifQuestionRatings[i].question);
      this.ifQRatings.push(String(this.ifQuestionRatings[i].rating));
    }

    this.iFeedback = new IFeedback();

    this.iFeedback.rQuestions = this.ifQuestions;
    this.iFeedback.qRating = this.ifQRatings;
    this.iFeedback.comment = this.ifComment;

    this.visitService
      .getVisitByVisitId(this.ifDialogVisitId)
      .subscribe(response => {
        this.ifVisit = response.visit;
        this.iFeedback.visit = this.ifVisit;

        this.iFeedbackService
          .createIFeedback(this.iFeedback)
          .subscribe(response => {
            this.msgs.push({
              severity: "info",
              summary: "Successfully Submitted!",
              detail: ""
            });

            this.ifDisplay = false;

            let endpoint = "/updateIFeedbackSubmitted";
            let body = {
              visitId: String(this.ifDialogVisitId),
              iFeedbackSubmitted: true
            };

            this.visitService
              .updateVFeedbackSubmitted(endpoint, body)
              .subscribe(response => {
                setTimeout(function() {
                  location.reload();
                }, 300);
              });
          });
      });
  }
}
