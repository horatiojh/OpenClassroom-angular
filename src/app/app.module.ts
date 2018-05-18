import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {
  InputTextModule,
  ScrollPanelModule,
  ButtonModule,
  MessageModule
} from 'primeng/primeng';

import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { Api } from '../providers/api';
import { AppTopbarComponent } from './app.topbar.component';
import { AppRightpanelComponent } from './app.rightpanel.component';
import { AppFooterComponent } from './app.footer.component';
import { AppMenuComponent, AppSubMenuComponent } from './app.menu.component';
import { AppBreadcrumbComponent } from './app.breadcrumb.component';
import { BreadcrumbService } from './breadcrumb.service';
import { AppInlineProfileComponent } from './app.profile.component';
import { MainComponent } from './main.component';

@NgModule({
  declarations: [
    AppComponent,
    AppTopbarComponent,
    AppRightpanelComponent,
    AppFooterComponent,
    AppMenuComponent,
    AppSubMenuComponent,
    AppBreadcrumbComponent,
    AppInlineProfileComponent,
    LoginComponent,
    DashboardComponent,
    MainComponent
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
    ScrollPanelModule
  ],
  providers: [
    Api,
    BreadcrumbService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
