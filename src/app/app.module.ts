import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main.component';

import {
  InputTextModule,
  ScrollPanelModule,
  ButtonModule,
  MessageModule,
  GrowlModule,
  DataTableModule,
  TableBody
} from 'primeng/primeng';

import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';

import { LoginComponent } from './pages/login/login.component';
import { StaffInfoComponent } from './pages/staff_info/staff_info.component';

import { Api } from '../providers/api';
import { AppTopbarComponent } from './app.topbar.component';
import { AppMenuComponent, AppSubMenuComponent } from './app.menu.component';
import { AppInlineProfileComponent } from './app.profile.component';

@NgModule({
  declarations: [
    AppComponent,
    AppTopbarComponent,
    AppMenuComponent,
    AppSubMenuComponent,
    AppInlineProfileComponent,
    LoginComponent,
    StaffInfoComponent,
    MainComponent,
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
    TableModule
  ],
  providers: [
    Api
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
