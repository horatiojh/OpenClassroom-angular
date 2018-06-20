import { Component, OnInit } from "@angular/core";

import { MessageEntity } from "../../../../domain/message";
import { MessageService } from "../../../../providers/messageService";

@Component({
  selector: "app-profViewNotification",
  templateUrl: "./prof_view_notification.component.html",
  styleUrls: ["./prof_view_notification.component.css"]
})
export class ProfViewNotificationsComponent implements OnInit {
  staffId: number;
  unReadMessages: MessageEntity[];
  readMessages: MessageEntity[];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
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
}
