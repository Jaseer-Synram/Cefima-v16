import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as io from "socket.io-client";
@Injectable({
  providedIn: "root",
})
export class SocketService {
  socket: any;
  readonly url: string = "http://localhost:3000/";

  constructor() {
    this.setupSocketConnection();
  }

  public AddCurrentUserId(userId): void {
    this.socket.emit("addUser", userId);
    this.socket.on("getUsers", (users) => {
      console.log(users);
    });
  }

  public setupSocketConnection(): void {
    // this.socket = io.io(this.url, { transports: ["websocket"] });
    this.socket = io.io(this.url);

    console.log(this.socket);
  }
  public SendMessage(message, senderId, casenoId, receiverId, type, ticket) {
    this.socket.emit("sendMessage", {
      senderId,
      receiverId,
      casenoId,
      text: message,
      type,
      ticket,
    });
  }
  public GetMessage = () => {
    return new Observable((observer) => {
      this.socket.on("getMessage", (data) => {
        observer.next(data);
      });
    });
  };

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
