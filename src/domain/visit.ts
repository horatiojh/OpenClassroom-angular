import { DateEntity } from "./date";

export class Visit {
  id: number;
  visitorName: string;
  visitorId: number;
  instructorId: number;
  startTime: string;
  endTime: string;
  visitDate: string;
  weekDay: string;
  room: string;
  vStatus: string;
  iStatus: string;
  vfeedbackSubmitted: boolean;
  ifeedbackSubmitted: boolean;
  complete: boolean;

  date: DateEntity;

  moduleCode: string;
  moduleTitle: string;
  moduleGroup: string;
  instructorName: string;

  constructor() {}
}
