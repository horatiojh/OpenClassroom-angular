import { Component, OnInit } from '@angular/core';
import { Api } from '../../../providers/api';
import { Router } from '@angular/router';
import { Message } from 'primeng/primeng';

import { FileUploadService } from '../../../providers/fileUploadService';
import { ClassroomService } from '../../../providers/classroomService';

import { Classroom } from '../../../domain/classroom';

@Component({
  selector: 'app-viewClassroom',
  templateUrl: './view_classroom.component.html',
  styleUrls: ['./view_classroom.component.css']
})
export class ViewClassroomComponent implements OnInit {

  // for upload file
  msgs: Message[] = [];

  // for datatable
  cols: any[];
  classrooms: Classroom;

  constructor(private fileUploadService: FileUploadService,
    private router: Router,
    private classroomService: ClassroomService) {
  }

  ngOnInit() {

    //for datatable
    this.cols = [
      { field: 'building', header: 'Building', width: "12%" },
      { field: 'roomId', header: 'RoomId', width: "12%" },
      { field: 'venueName', header: 'Venue', width: "28%" },
      { field: 'deptId', header: 'DeptId', width: "12%" },
      { field: 'capacity', header: 'Capacity', width: "12%", textAlign: "center" },
      { field: 'linkCode', header: 'LinkCode', width: "12%" }
    ];
    this.classroomService.getAllClassrooms().subscribe(response => this.classrooms = response.classrooms);
  }

  onFileUpload(event, form) {

    let data = new FormData();
    data.append("file", event.files[0]);

    this.fileUploadService.uploadClassroom(data).subscribe(
      response => {
        form.clear();
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'File Uploaded', detail: '' });
      },
      error => {
        form.clear();
        this.msgs = [];
        this.msgs.push({ severity: "error", summary: "HTTP " + error.status, detail: '' });
      }
    );
  }
}
