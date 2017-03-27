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
    let baseMinutes = new Date().getMinutes();
    console.log(baseMinutes);
    this.user = JSON.parse(sessionStorage.getItem('user'));

    this.ws = new $WebSocket(`ws://${window.location.hostname}:8080/ws`);

    this.ws.onMessage(
      (msg: MessageEvent)=> {
        console.log("onMessage ", msg.data);
        console.log("User nickname: ", this.user.nickName);

        let msgData = JSON.parse(msg.data);
        msgData.msgSent = this.user.nickName === JSON.parse(msg.data).nickname;

        let nowMinuts = new Date().getMinutes();
        console.log(nowMinuts);
        msgData.timePast = nowMinuts - baseMinutes;

        if (msgData.action == 'entered') return;


        this.messages = [...this.messages, msgData];
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
