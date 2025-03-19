import { Component } from '@angular/core';
//import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  standalone: false
})
export class ChatComponent {
  messages: { text: string; sender: string }[] = [];
  messageText = '';

  constructor() {}

  sendMessage() {
    if (!this.messageText.trim()) return;

    // Add user message
    this.messages.push({ text: this.messageText, sender: 'user' });

    // Call backend (JHipster API)
    // this.chatService.sendMessage(this.messageText).subscribe(response => {
       this.messages.push({ text: 'hi', sender: 'bot' });
    // });

    this.messageText = '';
  }
}
