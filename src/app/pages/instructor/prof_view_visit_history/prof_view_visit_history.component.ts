import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";

import { Message, ConfirmationService } from "primeng/primeng";

import { BreadcrumbService } from "../../../breadcrumb.service";
import { VisitService } from "../../../../providers/visitService";
import { StaffService } from "../../../../providers/staffService";
import { MsgService } from "../../../../providers/msgService";
import { VFeedbackService } from "../../../../providers/vFeedbackService";
import { IFeedbackService } from "../../../../providers/iFeedbackService";
import { EmailService } from "src/providers/emailService";

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
  iConfirmedFeedbackedVisit: Visit[];
  iConfirmedNonFeedbackedVisit: Visit[];
  iPendingVisit: Visit[];
  iCancelledVisit: Visit[];
  vConfirmedFeedbackedVisit: Visit[];
  vConfirmedNonFeedbackedVisit: Visit[];
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
  iDisplay: boolean = false;
  iDialogVisitId: number;
  iVisit: Visit;
  iStaffId: number;
  iStaff: Staff;

  vMsgContent: string;
  vMsgTitle: string;
  vDisplay: boolean = false;
  vDialogVisitId: number;
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

  // for view instructor's feedback
  viFeedback: IFeedback;
  vifDialogVisitId: number;
  vifDisplay: boolean = false;
  vifQuestionRatings: QuestionRating[] = [];
  vifQuestionAAns: string;
  vifRQuestions: string[] = [];
  vifQRatings: string[] = [];

  // for view instructor's private message (from observer)
  vIMDisplay: boolean = false;
  vIMDialogVisitId: number;
  vIMFeedback: VFeedback;
  vIMOpenAns: string[] = [];
  vIMQuestionAAns: string = "";
  vIMQuestionBAns: string = "";
  vIMQuestionCAns: string = "";

  // for view observer's private message (from instructor)
  vVMDisplay: boolean = false;
  vVMDialogVisitId: number;
  vVMFeedback: IFeedback;
  vVMQuestionAAns: string;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private visitService: VisitService,
    private staffService: StaffService,
    private confirmationService: ConfirmationService,
    private domSanitizer: DomSanitizer,
    private msgService: MsgService,
    private vFeedbackService: VFeedbackService,
    private iFeedbackService: IFeedbackService,
    private emailService: EmailService
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
        "As a result of the visit I anticipate making changes to my classes.",
      rating: 0
    });

    this.ifQuestionRatings.push({
      question: "The visit caused me to reflect on my teaching.",
      rating: 0
    });

    this.ifQuestionRatings.push({
      question:
        "As a result of the visit I will implement changes to how I teach this course.",
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
      { field: "visitorName", header: "Observer", width: "12%" },
      { field: "moduleCode", header: "Code", width: "9%" },
      { field: "visitDate", header: "Date", width: "10%" },
      { field: "startTime", header: "Start", width: "9%" },
      { field: "endTime", header: "End", width: "8%" },
      { field: "weekDay", header: "Day", width: "8%" },
      { field: "room", header: "Room", width: "8%" }
    ];

    this.vCols = [
      { field: "moduleCode", header: "Code", width: "8%" },
      { field: "instructorName", header: "Instructor", width: "15%" },
      { field: "visitDate", header: "Date", width: "9%" },
      { field: "startTime", header: "Start", width: "8%" },
      { field: "endTime", header: "End", width: "8%" },
      { field: "weekDay", header: "Day", width: "8%" },
      { field: "room", header: "Room", width: "8%" }
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
          .getAllIFeedbackedConfirmedVisitsByStaffId(this.staffIdStr)
          .subscribe(response => {
            if (response != null && typeof response.visits != undefined) {
              this.iConfirmedFeedbackedVisit = response.visits;
            } else {
              this.msgs.push({
                severity: "error",
                summary: "An error has occurred while processing the request",
                detail: ""
              });
            }
          });

        this.visitService
          .getAllNonIFeedbackedConfirmedVisitsByStaffId(this.staffIdStr)
          .subscribe(response => {
            if (response != null && typeof response.visits != undefined) {
              this.iConfirmedNonFeedbackedVisit = response.visits;
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
        } else {
          this.msgs.push({
            severity: "error",
            summary: "An error has occurred while processing the request",
            detail: ""
          });
        }
      });

    this.visitService
      .getAllVFeedbackedConfirmedVisits(this.staffId)
      .subscribe(response => {
        if (response != null && typeof response.visits != undefined) {
          this.vConfirmedFeedbackedVisit = response.visits;
        } else {
          this.msgs.push({
            severity: "error",
            summary: "An error has occurred while processing the request",
            detail: ""
          });
        }
      });

    this.visitService
      .getAllNonVFeedbackedConfirmedVisits(this.staffId)
      .subscribe(response => {
        if (response != null && typeof response.visits != undefined) {
          this.vConfirmedNonFeedbackedVisit = response.visits;
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

            // send message to visitor
            let endpoint = "/createCancelledMessage";
            let body = {
              content: this.iMsgContent,
              title: this.iMsgTitle,
              visitId: String(this.iDialogVisitId),
              staffId: String(this.iStaff.id)
            };

            this.msgService
              .createMessage(endpoint, body)
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
        // send email to visitor
        let endpointSendEmailToVisitor = "/sendEmail";
        let bodySendEmailToVisitor = {
          visitId: String(this.iDialogVisitId),
          staffId: String(this.iStaffId),
          keyword: "cancelledByInstructor"
        };

        this.emailService
          .sendEmail(endpointSendEmailToVisitor, bodySendEmailToVisitor)
          .subscribe(response => {
            console.log("send email to visitor");
          });

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

            // send message to instructor
            let endpoint = "/createCancelledMessage";
            let body = {
              content: this.vMsgContent,
              title: this.vMsgTitle,
              visitId: String(this.vDialogVisitId),
              staffId: String(this.vStaff.id)
            };

            this.msgService
              .createMessage(endpoint, body)
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
        // send email to instructor
        let endpointSendEmailToInstructor = "/sendEmail";
        let bodySendEmailToInstructor = {
          visitId: String(this.vDialogVisitId),
          staffId: String(this.vStaffId),
          keyword: "cancelledByVisitor"
        };

        this.emailService
          .sendEmail(endpointSendEmailToInstructor, bodySendEmailToInstructor)
          .subscribe(response => {
            console.log("send email to instructor");
          });

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
        this.vvfQuestionRatings = [];

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

  showInstructorFeedbackFormDialog(rowData) {
    this.ifDisplay = true;
    this.ifDialogVisitId = rowData.id;
  }

  showInstructorMessageDialog(rowData) {
    this.vIMDisplay = true;
    this.vIMDialogVisitId = rowData.id;

    this.vFeedbackService
      .getVFeedbackByVisitId(this.vIMDialogVisitId)
      .subscribe(response => {
        this.vIMFeedback = response.vFeedback;

        this.vIMOpenAns = this.vIMFeedback.oAns;

        // open questions
        this.vIMQuestionAAns = this.vIMOpenAns[0];
        this.vIMQuestionBAns = this.vIMOpenAns[1];
        this.vIMQuestionCAns = this.vIMOpenAns[2];
      });
  }

  showVisitorMessageDialog(rowData) {
    this.vVMDisplay = true;
    this.vVMDialogVisitId = rowData.id;

    this.iFeedbackService
      .getIFeedbackByVisitId(this.vVMDialogVisitId)
      .subscribe(response => {
        this.vVMFeedback = response.iFeedback;

        // open question (private message)
        this.vVMQuestionAAns = this.vVMFeedback.comment;
      });
  }

  showViewInstructorFeedbackDetailsDialog(rowData) {
    this.vifDisplay = true;
    this.vifDialogVisitId = rowData.id;

    this.iFeedbackService
      .getIFeedbackByVisitId(this.vifDialogVisitId)
      .subscribe(response => {
        this.viFeedback = response.iFeedback;

        this.vifRQuestions = this.viFeedback.rQuestions;
        this.vifQRatings = this.viFeedback.qRating;

        // open question (private message)
        this.vifQuestionAAns = this.viFeedback.comment;

        // question & rating
        this.vifQuestionRatings = [];

        for (let i = 0; i < this.vifRQuestions.length; i++) {
          this.vifQuestionRatings.push({
            question: this.vifRQuestions[i],
            rating: Number(this.vifQRatings[i])
          });
        }
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

    this.visitService
      .getVisitByVisitId(this.vfDialogVisitId)
      .subscribe(response => {
        this.vfVisit = response.visit;
        this.vFeedback.visit = this.vfVisit;

        let endpoint = "/createVFeedback";
        let body = {
          vFeedback: this.vFeedback,
          visitId: String(this.vfVisit.id)
        };

        this.vFeedbackService
          .createVFeedback(endpoint, body)
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
    this.iFeedback.comment = this.iQuestionAAns;

    this.visitService
      .getVisitByVisitId(this.ifDialogVisitId)
      .subscribe(response => {
        this.ifVisit = response.visit;
        this.iFeedback.visit = this.ifVisit;

        let endpoint = "/createIFeedback";
        let body = {
          iFeedback: this.iFeedback,
          visitId: String(this.ifVisit.id)
        };

        this.iFeedbackService
          .createIFeedback(endpoint, body)
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
