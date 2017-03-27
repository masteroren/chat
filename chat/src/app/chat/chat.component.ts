import {Component, OnInit} from '@angular/core';
import {$WebSocket,WebSocketSendMode} from 'angular2-websocket/angular2-websocket'
import {IMessage} from "../interfaces/message";
import {IUsePropertyDecoratorConfig} from "codelyzer/propertyDecoratorBase";
import {IUser} from "../interfaces/iuser";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['chat.component.scss']
})
export class ChatComponent implements OnInit {

  private ws: $WebSocket;
  private messages: IMessage[] = [];
  private user: IUser;
  private msgSent: boolean;

  constructor() {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.ws = new $WebSocket(`ws://${window.location.hostname}:8080/ws`);

    this.ws.onMessage(
      (msg: MessageEvent)=> {
        console.log("onMessage ", msg.data);

        this.msgSent = this.user.nickName === JSON.parse(msg.data).nickName;

        this.messages = [...this.messages, JSON.parse(msg.data)];
      },
      {autoApply: false}
    );

    this.ws.setSend4Mode(WebSocketSendMode.Direct);

    this.ws.send(this.user.nickName);
  }

  send(message){
    this.ws.send(message);
  }

}
