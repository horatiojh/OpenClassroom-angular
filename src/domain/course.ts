import { Timetable } from "./timetable";

export class Course {
  id: number;
  instructorId: string;
  staffName: string;
  eventId: string;
  faculty: string;
  dept: string;
  moduleCode: string;
  instance: string;
  moduleGroup: string;
  moduleType: string;
  moduleTitle: string;
  groupSize: string;
  eventSize: string;
  syllabus: string;
  blackoutDates: string;

  timetables: Timetable[];

  constructor(
    id: number,
    instructorId: string,
    staffName: string,
    eventId: string,
    faculty: string,
    dept: string,
    moduleCode: string,
    instance: string,
    moduleGroup: string,
    moduleType: string,
    moduleTitle: string,
    groupSize: string,
    eventSize: string,
    description: string,
    syllabus: string,
    blackoutDates: string
  ) {
    this.id = id;
    this.instructorId = instructorId;
    this.staffName = staffName;
    this.eventId = eventId;
    this.faculty = faculty;
    this.dept = dept;
    this.moduleCode = moduleCode;
    this.instance = instance;
    this.moduleGroup = moduleGroup;
    this.moduleType = moduleType;
    this.moduleTitle = moduleTitle;
    this.groupSize = groupSize;
    this.eventSize = eventSize;
    this.syllabus = syllabus;
    this.blackoutDates = blackoutDates;
  }
}
