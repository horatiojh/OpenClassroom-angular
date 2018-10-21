import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { MainComponent } from "./main.component";

import { AppTopbarComponent } from "./app.topbar.component";
import { AppMenuComponent, AppSubMenuComponent } from "./app.menu.component";
import { AppInlineProfileComponent } from "./app.profile.component";
import { AppBreadcrumbComponent } from "./app.breadcrumb.component";
import { BreadcrumbService } from "./breadcrumb.service";

import {
  InputTextModule,
  ScrollPanelModule,
  MessageModule,
  GrowlModule,
  DataTableModule
} from "primeng/primeng";

import { TableModule } from "primeng/table";
import { FileUploadModule } from "primeng/fileupload";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { CalendarModule } from "primeng/calendar";
import { TabViewModule } from "primeng/tabview";
import { AccordionModule } from "primeng/accordion";
import { CardModule } from "primeng/card";
import { TooltipModule } from "primeng/tooltip";
import { EditorModule } from "primeng/editor";
import { DialogModule } from "primeng/dialog";
import { SplitButtonModule } from "primeng/splitbutton";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService } from "primeng/api";
import { InputTextareaModule } from "primeng/inputtextarea";
import { DataViewModule } from "primeng/dataview";
import { ListboxModule } from "primeng/listbox";
import { RatingModule } from "primeng/rating";
import { RadioButtonModule } from "primeng/radiobutton";
import { ChipsModule } from "primeng/chips";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { ToggleButtonModule } from "primeng/togglebutton";

import { Api } from "../providers/api";
import { FileUploadService } from "../providers/fileUploadService";
import { ClassroomService } from "../providers/classroomService";
import { StaffService } from "../providers/staffService";
import { CourseService } from "../providers/courseService";
import { TimetableService } from "../providers/timetableService";
import { ShareService } from "../providers/shareService";
import { AuthService } from "../providers/authService";
import { DateService } from "../providers/dateService";
import { CourseInfoService } from "../providers/courseInfoService";
import { VisitService } from "../providers/visitService";
import { MsgService } from "../providers/msgService";
import { MessageService } from "primeng/components/common/messageservice";
import { VFeedbackService } from "../providers/vFeedbackService";
import { IFeedbackService } from "../providers/iFeedbackService";
import { TagService } from "../providers/tagService";
import { RatingService } from "../providers/ratingService";

import { AdminGuard } from "./guards/admin.guard";
import { AuthGuard } from "./guards/auth.guard";
import { InstructorGuard } from "./guards/instructor.guard";

import { ProfViewTimetableComponent } from "./pages/instructor/prof_view_timetable/prof_view_timetable.component";
import { ProfViewIndivCourseTimetableComponent } from "./pages/instructor/prof_view_indiv_course_timetable/prof_view_indiv_course_timetable.component";
import { ProfViewCourseDetailsComponent } from "./pages/instructor/prof_view_course_details/prof_view_course_details.component";
import { ProfUpdateCourseComponent } from "./pages/instructor/prof_update_course/prof_update_course.component";
import { ProfSearchCourseComponent } from "./pages/instructor/prof_search_course/prof_search_course.component";
import { ProfViewRequestCourseComponent } from "./pages/instructor/prof_view_request_course/prof_view_request_course.component";
import { WorkspaceComponent } from "./pages/instructor/workspace/workspace.component";
import { ProfViewRequestCourseDetailsComponent } from "./pages/instructor/prof_view_request_course_details/prof_view_request_course_details.component";
import { ProfViewVisitHistoryComponent } from "./pages/instructor/prof_view_visit_history/prof_view_visit_history.component";
import { ProfViewNotificationsComponent } from "./pages/instructor/prof_view_notification/prof_view_notification.component";
import { ProfViewNotificationContentComponent } from "./pages/instructor/prof_view_notification_content/prof_view_notification_content.component";
import { ProfUpdateProfileComponent } from "./pages/instructor/prof_update_profile/prof_update_profile.component";
import { ProfAppRatingComponent } from "./pages/instructor/prof_app_rating/prof_app_rating.component";

import { ViewStaffInfoComponent } from "./pages/admin/view_staff_info/view_staff_info.component";
import { ViewClassroomComponent } from "./pages/admin/view_classroom/view_classroom.component";
import { ViewCourseListComponent } from "./pages/admin/view_course_list/view_course_list.component";
import { ViewTimetableComponent } from "./pages/admin/view_timetable/view_timetable.component";
import { ViewIndivCourseTimetableComponent } from "./pages/admin/view_indiv_course_timetable/view_indiv_course_timetable.component";
import { SearchCourseComponent } from "./pages/admin/search_course/search_course.component";
import { ViewRequestCourseComponent } from "./pages/admin/view_request_course/view_request_course.component";
import { ViewCourseDetailsComponent } from "./pages/admin/view_course_details/view_course_details.component";
import { ViewRequestCourseDetailsComponent } from "./pages/admin/view_request_course_details/view_request_course_details.component";
import { UpdateCourseComponent } from "./pages/admin/update_course/update_course.component";
import { UpdateProfileComponent } from "./pages/admin/update_profile/update_profile.component";
import { AppRatingComponent } from "./pages/admin/app_rating/app_rating.component";
import { ViewScheduleListComponent } from "./pages/admin/view_schedule_list/view_schedule_list.component";
import { LoggerComponent } from "./pages/admin/logger/logger.component";

import { LoginComponent } from "./pages/common/login/login.component";

import { ModuleCardComponent } from "./pages/card/module_card/module_card.component";
import { RequestDateCardComponent } from "./pages/card/request_date_card/request_date_card.component";
import { RequestTimetableCardComponent } from "./pages/card/request_timetable_card/request_timetable_card.component";
import { ProfRequestDateCardComponent } from "./pages/card/prof_request_date_card/prof_request_date_card.component";

@NgModule({
  declarations: [
    AppComponent,
    AppTopbarComponent,
    AppMenuComponent,
    AppSubMenuComponent,
    AppInlineProfileComponent,
    AppBreadcrumbComponent,
    MainComponent,
    LoginComponent,
    ViewStaffInfoComponent,
    ViewClassroomComponent,
    ViewCourseListComponent,
    ViewTimetableComponent,
    WorkspaceComponent,
    ProfViewVisitHistoryComponent,
    ViewIndivCourseTimetableComponent,
    ProfViewTimetableComponent,
    ProfViewIndivCourseTimetableComponent,
    ProfViewCourseDetailsComponent,
    ProfUpdateCourseComponent,
    SearchCourseComponent,
    ProfSearchCourseComponent,
    ModuleCardComponent,
    ProfViewRequestCourseComponent,
    ViewRequestCourseComponent,
    RequestDateCardComponent,
    ViewCourseDetailsComponent,
    RequestTimetableCardComponent,
    ProfViewRequestCourseDetailsComponent,
    ViewRequestCourseDetailsComponent,
    ProfViewNotificationsComponent,
    ProfViewNotificationContentComponent,
    ProfUpdateProfileComponent,
    UpdateCourseComponent,
    UpdateProfileComponent,
    AppRatingComponent,
    ProfAppRatingComponent,
    ViewScheduleListComponent,
    ProfRequestDateCardComponent,
    LoggerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    MessageModule,
    ScrollPanelModule,
    FileUploadModule,
    GrowlModule,
    DataTableModule,
    TableModule,
    DropdownModule,
    CalendarModule,
    TabViewModule,
    AccordionModule,
    CardModule,
    TooltipModule,
    EditorModule,
    DialogModule,
    SplitButtonModule,
    ConfirmDialogModule,
    InputTextareaModule,
    DataViewModule,
    ListboxModule,
    RatingModule,
    RadioButtonModule,
    ChipsModule,
    ProgressSpinnerModule,
    ToggleButtonModule
  ],
  providers: [
    Api,
    BreadcrumbService,
    FileUploadService,
    ClassroomService,
    StaffService,
    CourseService,
    TimetableService,
    ShareService,
    AuthService,
    AdminGuard,
    AuthGuard,
    InstructorGuard,
    DateService,
    ConfirmationService,
    CourseInfoService,
    VisitService,
    MsgService,
    MessageService,
    VFeedbackService,
    IFeedbackService,
    TagService,
    RatingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
