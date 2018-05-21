import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

import { LoginComponent } from './pages/login/login.component';
import { StaffInfoComponent } from './pages/staff_info/staff_info.component';
import { ViewClassroomComponent } from './pages/view_classroom/view_classroom.component';

const routes: Routes = [

    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: '',
        component: MainComponent,
        children: [
            { path: 'staffInfo', component: StaffInfoComponent },
            { path: 'viewClassroom', component: ViewClassroomComponent }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: [
    ]
})

export class AppRoutingModule { }