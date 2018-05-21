import { Component, OnInit } from '@angular/core';
import { Api } from '../../../providers/api';
import { Router } from '@angular/router';
import { Message } from 'primeng/primeng';
import { FileUploadService } from '../../../providers/fileUpload';

@Component({
  selector: 'app-staffInfo',
  templateUrl: './staff_info.component.html',
  styleUrls: ['./staff_info.component.css']
})
export class StaffInfoComponent implements OnInit {

  msgs: Message[] = [];

  constructor(private fileUploadService: FileUploadService, private router: Router) {
  }

  ngOnInit() {
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
