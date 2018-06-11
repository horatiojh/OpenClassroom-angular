import { Course } from "./course";

export class Timetable {
  id: number;
  weeksName: string;
  weeks: string;
  weekDay: string;
  startTime: string;
  endTime: string;
  roomPart: string;
  room: string;
  duration: string;

  course: Course;

  staffName: string;
  moduleCode: string;
  moduleTitle: string;
  moduleGroup: string;

  constructor(
    id: number,
    weeksName: string,
    weeks: string,
    weekDay: string,
    startTime: string,
    endTime: string,
    roomPart: string,
    room: string,
    duration: string
  ) {
    this.id = id;
    this.weeksName = weeksName;
    this.weeks = weeks;
    this.weekDay = weekDay;
    this.startTime = startTime;
    this.endTime = endTime;
    this.roomPart = roomPart;
    this.room = room;
    this.duration = duration;
  }
}
