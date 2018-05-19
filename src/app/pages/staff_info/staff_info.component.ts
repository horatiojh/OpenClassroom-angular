import { Component, OnInit } from '@angular/core';
import { MessageModule } from 'primeng/primeng';

@Component({
  selector: 'app-staffInfo',
  templateUrl: './staff_info.component.html',
  styleUrls: ['./staff_info.component.css']
})
export class StaffInfoComponent implements OnInit {

  msgs: MessageModule[];
  uploadedFiles: any[] = [];

  constructor() { }

  ngOnInit() {
  }

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }
}
