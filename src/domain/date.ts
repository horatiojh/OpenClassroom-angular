import { Timetable } from "./timetable";

export class DateEntity {
  id: number;
  dateStr: string;
  startTime: string;
  endTime: string;
  status: string;
  isExpired: string;
  isBooked: string;
  timetable: Timetable;

  constructor() {}
}
