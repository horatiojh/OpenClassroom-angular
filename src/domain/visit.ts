import { DateEntity } from "./date";

export class Visit {
  id: number;
  visitorName: string;
  visitorId: number;
  startTime: string;
  endTime: string;
  visitDate: string;
  weekDay: string;
  isVCanceled: boolean;
  isICanceled: boolean;
  isVConfirmed: boolean;
  isIConfirmed: boolean;

  date: DateEntity;

  moduleCode: string;
  moduleTitle: string;
  moduleGroup: string;

  constructor() {}
}
