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
  DataTableModule,
  TableBody
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
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

import { Api } from "../providers/api";
import { FileUploadService } from "../providers/fileUploadService";
import { ClassroomService } from "../providers/classroomService";
import { StaffService } from "../providers/staffService";
import { CourseService } from "../providers/courseService";
import { TimetableService } from "../providers/timetableService";
import { ShareService } from "../providers/shareService";
import { AuthService } from "../providers/authService";
import { DateService } from "../providers/dateService";

import { AdminGuard } from "./guards/admin.guard";
import { AuthGuard } from "./guards/auth.guard";
import { InstructorGuard } from "./guards/instructor.guard";

import { ProfViewCourseListComponent } from "./pages/instructor/prof_view_course_list/prof_view_course_list.component";
import { ProfViewTimetableComponent } from "./pages/instructor/prof_view_timetable/prof_view_timetable.component";
import { ProfUpdateTimetableComponent } from "./pages/instructor/prof_update_timetable/prof_update_timetable.component";
import { ProfViewIndivCourseTimetableComponent } from "./pages/instructor/prof_view_indiv_course_timetable/prof_view_indiv_course_timetable.component";
import { ProfViewCourseDetailsComponent } from "./pages/instructor/prof_view_course_details/prof_view_course_details.component";
import { ProfUpdateCourseComponent } from "./pages/instructor/prof_update_course/prof_update_course.component";
import { ProfSearchCourseComponent } from "./pages/instructor/prof_search_course/prof_search_course.component";
import { ProfViewRequestCourseComponent } from "./pages/instructor/prof_view_request_course/prof_view_request_course.component";
import { ProfViewRequestTimetableComponent } from "./pages/instructor/prof_view_request_timetable/prof_view_request_timetable.component";
import { ViewVisitHistoryComponent } from "./pages/instructor/view_visit_history/view_visit_history.component";
import { WorkspaceComponent } from "./pages/instructor/workspace/workspace.component";

import { ViewStaffInfoComponent } from "./pages/admin/view_staff_info/view_staff_info.component";
import { ViewClassroomComponent } from "./pages/admin/view_classroom/view_classroom.component";
import { ViewCourseListComponent } from "./pages/admin/view_course_list/view_course_list.component";
import { ViewTimetableComponent } from "./pages/admin/view_timetable/view_timetable.component";
import { UpdateTimetableComponent } from "./pages/admin/update_timetable/update_timetable.component";
import { ViewIndivCourseTimetableComponent } from "./pages/admin/view_indiv_course_timetable/view_indiv_course_timetable.component";
import { SearchCourseComponent } from "./pages/admin/search_course/search_course.component";
import { ViewRequestCourseComponent } from "./pages/admin/view_request_course/view_request_course.component";
import { DataAnalyticsComponent } from "./pages/admin/data_analytics/data_analytics.component";
import { ViewRequestTimetableComponent } from "./pages/admin/view_request_timetable/view_request_timetable.component";

import { LoginComponent } from "./pages/common/login/login.component";

import { ModuleCardComponent } from "./pages/card/module_card/module_card.component";
import { RequestTimetableCardComponent } from "./pages/card/request_timetable_card/request_timetable_card.component";

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
    DataAnalyticsComponent,
    UpdateTimetableComponent,
    WorkspaceComponent,
    ProfViewCourseListComponent,
    ViewVisitHistoryComponent,
    ViewIndivCourseTimetableComponent,
    ProfViewTimetableComponent,
    ProfUpdateTimetableComponent,
    ProfViewIndivCourseTimetableComponent,
    ProfViewCourseDetailsComponent,
    ProfUpdateCourseComponent,
    SearchCourseComponent,
    ProfSearchCourseComponent,
    ModuleCardComponent,
    ProfViewRequestCourseComponent,
    ViewRequestCourseComponent,
    ProfViewRequestTimetableComponent,
    RequestTimetableCardComponent,
    ViewRequestTimetableComponent
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
    ConfirmDialogModule
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
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
