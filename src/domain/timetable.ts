import { Course } from "./course";

export class Timetable {
  id: number;
  weeksName: string;
  weeks: string;
  weekDay: string;
  startTime: string;
  endTime: string;
  room: string;
  duration: string;

  course: Course;

  staffName: string;
  moduleCode: string;
  moduleTitle: string;
  moduleGroup: string;
  division: string;
  courseStatus: string;

  constructor(
    id: number,
    weeksName: string,
    weeks: string,
    weekDay: string,
    startTime: string,
    endTime: string,
    room: string,
    duration: string
  ) {
    this.id = id;
    this.weeksName = weeksName;
    this.weeks = weeks;
    this.weekDay = weekDay;
    this.startTime = startTime;
    this.endTime = endTime;
    this.room = room;
    this.duration = duration;
  }
}
