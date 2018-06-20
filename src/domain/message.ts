import { Staff } from "./staff";

export class MessageEntity {
  id: number;
  messageDate: string;
  content: string;
  title: string;
  isClicked: boolean;
  visitId: number;

  staff: Staff;

  constructor() {}
}
