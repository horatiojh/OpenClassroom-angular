import { DateEntity } from "./date";

export class Visit {
  id: number;
  visitorName: string;
  startTime: string;
  endTime: string;
  visitDate: string;
  visitDay: string;
  date: DateEntity;

  constructor() {}
}
