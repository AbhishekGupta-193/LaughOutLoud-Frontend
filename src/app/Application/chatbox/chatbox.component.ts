import { Component } from '@angular/core';
import { WebsocketService } from './sharedData/websocket.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent {
  messages: string[] = [];
  message: string = '';
  userId: string = '3'; // Example user ID
  targetId: string = '4'; // Example target user ID

  constructor(private webSocketService: WebsocketService,private route: ActivatedRoute) {}

  ngOnInit() {
    this.webSocketService.getMessages().subscribe((message: any) => {
      if (message.from === this.targetId) {
        this.messages.push(message.content);
      }
    });

    // Register the user with the WebSocket server
    this.webSocketService.sendMessage({
      type: 'register',
      userId: this.userId
    });
  }

  sendMessage() {
    this.webSocketService.sendMessage({
      type: 'private_message',
      userId: this.userId,
      targetId: this.targetId,
      content: this.message
    });
    this.message = '';
  }
}
