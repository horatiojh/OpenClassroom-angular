import { Timetable } from "./timetable";

export class Course {
  id: number;
  instructorId: string;
  staffName: string;
  moduleCode: string;
  moduleGroup: string;
  moduleTitle: string;
  syllabus: string;
  blackoutDates: string;
  tagList: string[];

  timetables: Timetable[];

  constructor(
    id: number,
    instructorId: string,
    staffName: string,
    moduleCode: string,
    moduleGroup: string,
    moduleTitle: string,
    syllabus: string,
    blackoutDates: string
  ) {
    this.id = id;
    this.instructorId = instructorId;
    this.staffName = staffName;
    this.moduleCode = moduleCode;
    this.moduleGroup = moduleGroup;
    this.moduleTitle = moduleTitle;
    this.syllabus = syllabus;
    this.blackoutDates = blackoutDates;
  }
}
