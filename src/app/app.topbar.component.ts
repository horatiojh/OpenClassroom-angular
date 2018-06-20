import { Component, OnInit } from "@angular/core";
import { MainComponent } from "./main.component";
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";

import { MessageService } from "../providers/messageService";

import { MessageEntity } from "../domain/message";

@Component({
  selector: "app-topbar",
  template: `
        <div class="topbar clearfix">
            <div class="topbar-left">
                <div style="font-size: 24px;color: aliceblue;margin-top: 7px">Open Classroom</div>
            </div>

            <div class="topbar-right">
                <a id="menu-button" href="#" (click)="app.onMenuButtonClick($event)">
                    <i></i>
                </a>

                <a id="topbar-menu-button" href="#" (click)="app.onTopbarMenuButtonClick($event)">
                    <i class="material-icons">menu</i>
                </a>

                <ul class="topbar-items animated fadeInDown" [ngClass]="{'topbar-items-visible': app.topbarMenuActive}">
                    <li #profile class="profile-item" *ngIf="app.profileMode==='top'||app.isHorizontal()"
                        [ngClass]="{'active-top-menu':app.activeTopbarItem === profile}">

                        <a href="#" (click)="app.onTopbarItemClick($event,profile)">
                            <img class="profile-image" src="assets/layout/images/avatar.png" />
                            <span class="topbar-item-name">Jane Williams</span>
                        </a>

                        <ul class="ultima-menu animated fadeInDown">
                            <li role="menuitem">
                                <a href="#">
                                    <i class="material-icons">person</i>
                                    <span>Profile</span>
                                </a>
                            </li>
                            <li role="menuitem">
                                <a href="#">
                                    <i class="material-icons">star_rate</i>
                                    <span>Rate App</span>
                                </a>
                            </li>
                            <li role="menuitem">
                                <a href="#">
                                    <i class="material-icons">power_settings_new</i>
                                    <span>Logout</span>
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li #messages [ngClass]="{'active-top-menu':app.activeTopbarItem === messages}">
                        <a href="#" (click)="app.onTopbarItemClick($event,messages)">
                            <i class="topbar-icon material-icons animated swing">message</i>
                            <span class="topbar-badge animated rubberBand">5</span>
                            <span class="topbar-item-name">Messages</span>
                        </a>
                        <ul class="ultima-menu animated fadeInDown">
                            <li role="menuitem">
                                <a href="#" class="topbar-message">
                                    <img src="assets/layout/images/avatar1.png" width="35"/>
                                    <span>Give me a call</span>
                                </a>
                            </li>
                            <li role="menuitem">
                                <a href="#" class="topbar-message">
                                    <img src="assets/layout/images/avatar2.png" width="35"/>
                                    <span>Sales reports attached</span>
                                </a>
                            </li>
                            <li role="menuitem">
                                <a href="#" class="topbar-message">
                                    <img src="assets/layout/images/avatar3.png" width="35"/>
                                    <span>About your invoice</span>
                                </a>
                            </li>
                            <li role="menuitem">
                                <a href="#" class="topbar-message">
                                    <img src="assets/layout/images/avatar2.png" width="35"/>
                                    <span>Meeting today at 10pm</span>
                                </a>
                            </li>
                            <li role="menuitem">
                                <a href="#" class="topbar-message">
                                    <img src="assets/layout/images/avatar4.png" width="35"/>
                                    <span>Out of office</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li #notifications [ngClass]="{'active-top-menu':app.activeTopbarItem === notifications}"
                    [style]="notificationStyle">
                        <a routerLink="/profViewNotification">
                            <i class="topbar-icon material-icons">timer</i>
                            <span class="topbar-badge animated rubberBand">{{numOfNewMsg}}</span>
                            <span class="topbar-item-name">Notifications</span>
                        </a>
                    </li>
                    <li #search class="search-item" [ngClass]="{'active-top-menu':app.activeTopbarItem === search}">
                        <a [routerLink]="searchLink">
                            <i class="topbar-icon material-icons">search</i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    `
})
export class AppTopbarComponent implements OnInit {
  searchLink: string;
  staffRole: string;
  notificationStyle: SafeStyle;

  // notification
  numOfNewMsg: number;
  staffId: number;
  newMsgs: MessageEntity[];

  constructor(
    public app: MainComponent,
    private domSanitizer: DomSanitizer,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.staffRole = sessionStorage.getItem("staffRole");

    if (this.staffRole === "admin") {
      this.searchLink = "/searchCourse";
      let style = "display:none";
      this.notificationStyle = this.domSanitizer.bypassSecurityTrustStyle(
        style
      );
    } else if (this.staffRole === "instructor") {
      this.searchLink = "/profSearchCourse";
      let style = "";
      this.notificationStyle = this.domSanitizer.bypassSecurityTrustStyle(
        style
      );
    }

    // for notification
    this.staffId = Number(sessionStorage.getItem("staffId"));

    this.messageService
      .getUnreadMessagesByStaffId(this.staffId)
      .subscribe(response => {
        this.newMsgs = response.messages;
        this.numOfNewMsg = this.newMsgs.length;
      });
  }
}
