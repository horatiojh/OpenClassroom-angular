import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updateTimetable',
  templateUrl: './update_timetable.component.html',
  styleUrls: ['./update_timetable.component.css']
})
export class UpdateTimetableComponent implements OnInit {

  timetableId: number;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.timetableId = Number(sessionStorage.getItem("timetableId"));
  }

}
