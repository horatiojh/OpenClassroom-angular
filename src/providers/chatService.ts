import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs/Rx";
import { WebsocketService } from "./websocketService";

const CHAT_URL = "ws://echo.websocket.org/";

export interface Message {
  staffId: string;
}

@Injectable()
export class ChatService {
  public notification: Subject<Message>;

  constructor(wsService: WebsocketService) {
    this.notification = <Subject<Message>>wsService.connect(CHAT_URL).map(
      (response: MessageEvent): Message => {
        let data = JSON.parse(response.data);
        return {
          staffId: data.staffId
        };
      }
    );
  }
}
