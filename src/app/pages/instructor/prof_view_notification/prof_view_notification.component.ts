import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";
import { Router } from "@angular/router";

import { Message, ConfirmationService } from "primeng/primeng";

import { MessageEntity } from "../../../../domain/message";

import { MessageService } from "../../../../providers/messageService";
import { ShareService } from "../../../../providers/shareService";
import { BreadcrumbService } from "../../../breadcrumb.service";

@Component({
  selector: "app-profViewNotification",
  templateUrl: "./prof_view_notification.component.html",
  styleUrls: ["./prof_view_notification.component.css"]
})
export class ProfViewNotificationsComponent implements OnInit {
  // for components
  msgs: Message[] = [];

  staffId: number;
  unReadMessages: MessageEntity[];
  readMessages: MessageEntity[];

  // css style
  viewButtonStyle: SafeStyle;
  deleteButtonStyle: SafeStyle;
  markButtonStyle: SafeStyle;

  constructor(
    private messageService: MessageService,
    private domSanitizer: DomSanitizer,
    private shareService: ShareService,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private confirmationService: ConfirmationService
  ) {
    this.breadcrumbService.setItems([{ label: "" }]);
  }

  ngOnInit() {
    // css style
    let viewBtnStyle = "margin-top: 6px;margin-left:50px";
    this.viewButtonStyle = this.domSanitizer.bypassSecurityTrustStyle(
      viewBtnStyle
    );

    let deleteBtnStyle = "margin-top: 6px;margin-left:30px";
    this.deleteButtonStyle = this.domSanitizer.bypassSecurityTrustStyle(
      deleteBtnStyle
    );

    let martBtnStyle = "margin-top: 6px;margin-left:70px";
    this.markButtonStyle = this.domSanitizer.bypassSecurityTrustStyle(
      martBtnStyle
    );

    // data view
    this.staffId = Number(sessionStorage.getItem("staffId"));

    this.messageService
      .getUnreadMessagesByStaffId(this.staffId)
      .subscribe(response => {
        this.unReadMessages = response.messages;
      });

    this.messageService
      .getReadMessagesByStaffId(this.staffId)
      .subscribe(response => {
        this.readMessages = response.messages;
      });
  }

  viewUnreadMessage(event: Event, msg: MessageEntity) {
    this.shareService.setValue("messageId", msg.id);
    this.router.navigate(["/profViewNotificationContent"]);
  }

  deleteUnreadMessage(messageId: number) {
    this.msgs = [];

    this.messageService.deleteMessage(messageId).subscribe(response => {
      console.log("delete unread message");
      this.msgs.push({
        severity: "info",
        summary: "Successfully Deleted!",
        detail: ""
      });

      setTimeout(function() {
        location.reload();
      }, 300);
    });
  }

  markReadMessage(event: Event, msg: MessageEntity) {
    this.msgs = [];

    let endpoint = "/markRead";
    let body = {
      messageId: String(msg.id)
    };

    this.messageService.markRead(endpoint, body).subscribe(response => {
      console.log("mark as read");
      this.msgs.push({
        severity: "info",
        summary: "Mark as read",
        detail: ""
      });

      setTimeout(function() {
        location.reload();
      }, 300);
    });
  }

  viewReadMessage(event: Event, msg: MessageEntity) {
    this.shareService.setValue("messageId", msg.id);
    this.router.navigate(["/profViewNotificationContent"]);
  }

  deleteReadMessage(messageId: number) {
    this.msgs = [];

    this.messageService.deleteMessage(messageId).subscribe(response => {
      console.log("delete unread message");
      this.msgs.push({
        severity: "info",
        summary: "Successfully Deleted!",
        detail: ""
      });

      setTimeout(function() {
        location.reload();
      }, 300);
    });
  }

  markUnreadMessage(event: Event, msg: MessageEntity) {
    this.msgs = [];

    let endpoint = "/markUnread";
    let body = {
      messageId: String(msg.id)
    };

    this.messageService.markRead(endpoint, body).subscribe(response => {
      console.log("mark as unread");
      this.msgs.push({
        severity: "info",
        summary: "Mark as unread",
        detail: ""
      });

      setTimeout(function() {
        location.reload();
      }, 300);
    });
  }

  deleteUnreadMessageConfirmDialog(event: Event, msg: MessageEntity) {
    this.msgs = [];
    this.confirmationService.confirm({
      message: "Are you sure that you want to delete it?",
      header: "Confirmation",
      icon: "fa fa-question-circle",
      accept: () => {
        this.deleteUnreadMessage(msg.id);
      },
      reject: () => {}
    });
  }

  deleteReadMessageConfirmDialog(event: Event, msg: MessageEntity) {
    this.msgs = [];
    this.confirmationService.confirm({
      message: "Are you sure that you want to delete it?",
      header: "Confirmation",
      icon: "fa fa-question-circle",
      accept: () => {
        this.deleteReadMessage(msg.id);
      },
      reject: () => {}
    });
  }
}
