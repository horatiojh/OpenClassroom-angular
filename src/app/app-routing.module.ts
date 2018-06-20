import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./main.component";

import { AuthGuard } from "./guards/auth.guard";
import { AdminGuard } from "./guards/admin.guard";
import { InstructorGuard } from "./guards/instructor.guard";

import { LoginComponent } from "./pages/common/login/login.component";

import { ProfViewTimetableComponent } from "./pages/instructor/prof_view_timetable/prof_view_timetable.component";
import { ProfUpdateTimetableComponent } from "./pages/instructor/prof_update_timetable/prof_update_timetable.component";
import { ProfViewIndivCourseTimetableComponent } from "./pages/instructor/prof_view_indiv_course_timetable/prof_view_indiv_course_timetable.component";
import { ProfViewCourseDetailsComponent } from "./pages/instructor/prof_view_course_details/prof_view_course_details.component";
import { ProfUpdateCourseComponent } from "./pages/instructor/prof_update_course/prof_update_course.component";
import { ProfSearchCourseComponent } from "./pages/instructor/prof_search_course/prof_search_course.component";
import { ProfViewRequestCourseComponent } from "./pages/instructor/prof_view_request_course/prof_view_request_course.component";
import { WorkspaceComponent } from "./pages/instructor/workspace/workspace.component";
import { ProfViewVisitHistoryComponent } from "./pages/instructor/prof_view_visit_history/prof_view_visit_history.component";
import { ProfViewNotificationsComponent } from "./pages/instructor/prof_view_notification/prof_view_notification.component";
import { ProfViewRequestCourseDetailsComponent } from "./pages/instructor/prof_view_request_course_details/prof_view_request_course_details.component";
import { ProfChangePasswordComponent } from "./pages/instructor/prof_change_password/prof_change_password.component";
import { ProfViewNotificationContentComponent } from "./pages/instructor/prof_view_notification_content/prof_view_notification_content.component";

import { ViewStaffInfoComponent } from "./pages/admin/view_staff_info/view_staff_info.component";
import { ViewClassroomComponent } from "./pages/admin/view_classroom/view_classroom.component";
import { ViewCourseListComponent } from "./pages/admin/view_course_list/view_course_list.component";
import { ViewTimetableComponent } from "./pages/admin/view_timetable/view_timetable.component";
import { UpdateTimetableComponent } from "./pages/admin/update_timetable/update_timetable.component";
import { ViewIndivCourseTimetableComponent } from "./pages/admin/view_indiv_course_timetable/view_indiv_course_timetable.component";
import { SearchCourseComponent } from "./pages/admin/search_course/search_course.component";
import { ViewRequestCourseComponent } from "./pages/admin/view_request_course/view_request_course.component";
import { DataAnalyticsComponent } from "./pages/admin/data_analytics/data_analytics.component";
import { ViewCourseDetailsComponent } from "./pages/admin/view_course_details/view_course_details.component";
import { ViewRequestCourseDetailsComponent } from "./pages/admin/view_request_course_details/view_request_course_details.component";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "profChangePassword", component: ProfChangePasswordComponent },
  {
    path: "",
    component: MainComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      { path: "viewStaffInfo", component: ViewStaffInfoComponent },
      { path: "viewClassroom", component: ViewClassroomComponent },
      { path: "viewCourseList", component: ViewCourseListComponent },
      { path: "dataAnalytics", component: DataAnalyticsComponent },
      { path: "viewTimetable", component: ViewTimetableComponent },
      { path: "updateTimetable", component: UpdateTimetableComponent },
      {
        path: "viewIndivCourseTimetable",
        component: ViewIndivCourseTimetableComponent
      },
      { path: "searchCourse", component: SearchCourseComponent },
      { path: "viewRequestCourse", component: ViewRequestCourseComponent },
      { path: "viewCourseDetails", component: ViewCourseDetailsComponent },
      {
        path: "viewRequestCourseDetails",
        component: ViewRequestCourseDetailsComponent
      }
    ]
  },
  {
    path: "",
    component: MainComponent,
    canActivate: [AuthGuard, InstructorGuard],
    children: [
      { path: "workspace", component: WorkspaceComponent },
      {
        path: "profViewVisitHistory",
        component: ProfViewVisitHistoryComponent
      },
      { path: "profViewTimetable", component: ProfViewTimetableComponent },
      { path: "profUpdateTimetable", component: ProfUpdateTimetableComponent },
      {
        path: "profViewIndivCourseTimetable",
        component: ProfViewIndivCourseTimetableComponent
      },
      {
        path: "profViewCourseDetails",
        component: ProfViewCourseDetailsComponent
      },
      { path: "profUpdateCourse", component: ProfUpdateCourseComponent },
      { path: "profSearchCourse", component: ProfSearchCourseComponent },
      {
        path: "profViewRequestCourse",
        component: ProfViewRequestCourseComponent
      },
      {
        path: "profViewRequestCourseDetails",
        component: ProfViewRequestCourseDetailsComponent
      },
      {
        path: "profViewNotification",
        component: ProfViewNotificationsComponent
      },
      {
        path: "profViewNotificationContent",
        component: ProfViewNotificationContentComponent
      }
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
