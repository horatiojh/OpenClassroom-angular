import { Component, OnInit } from '@angular/core';
import { Api } from '../../../providers/api';
import { Router } from '@angular/router';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-staffInfo',
  templateUrl: './staff_info.component.html',
  styleUrls: ['./staff_info.component.css']
})
export class StaffInfoComponent implements OnInit {

  msgs: Message[] = [];
  uploadedFiles: any[] = [];
  isUploaded: boolean;

  constructor(private api: Api, private router: Router) {
    this.isUploaded = false;
  }

  ngOnInit() {
  }

  onFileUpload(event) {

    this.isUploaded = true;

    console.log("upload file before");
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }

    console.log("upload file after")
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }

  // upload(event) {

  //   let endpoint = "upload/classroom";
  //   let body = {
  //     file: event.file
  //   };

  //   this.api.post(endpoint, body).subscribe(
  //     response => {
  //       console.log("response");
  //       this.msgs = [];
  //       this.msgs.push({ severity: 'info', summary: 'File Uploaded', detail: '' });
  //     },
  //     error => {
  //       console.log("error");
  //       this.msgs = [];
  //       this.msgs.push({ severity: "error", summary: "HTTP " + error.status, detail: error.error.message });
  //     }
  //   );
  // }
}
