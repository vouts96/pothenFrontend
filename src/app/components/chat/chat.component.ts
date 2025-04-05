import { Component, Input } from '@angular/core';
import { ChatService } from '../../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  standalone: false
})
export class ChatComponent {
  messages: { text: string; sender: string }[] = [];
  messageText = '';
  isLoading = false; // Spinner state

  @Input() auditResponse: any = []; // Receiving audit data

  constructor(private chatService: ChatService) {}

  sendMessage() {
    if (!this.messageText.trim()) return;

    // Add user message
    this.messages.push({ text: this.messageText, sender: 'user' });

    // Show loading spinner
    this.isLoading = true;

    // Extract `modifiedBy` and `modifiedDate`, format as string
    const formattedData = this.auditResponse.map((item: { id: any; modifiedBy: any; modifiedDate: any; }) =>
      `ID: ${item.id}, Τροποποιήθηκε από: ${item.modifiedBy}, Ημερομηνία Τροποποίησης: ${item.modifiedDate.split('T')[0]}`
    ).join("\n");

    // Prepare full prompt
    const fullPrompt = `${this.messageText}\n\nΑρχείο Καταγραφής:\n${formattedData}`;

    console.log(fullPrompt)
    // Call backend (JHipster API)
    this.chatService.sendMessage(fullPrompt).subscribe(response => {
        this.messages.push({ text: response.response, sender: 'bot' });

        // Hide loading spinner
        this.isLoading = false;
     }, () => {
      // In case of an error, hide spinner
      this.isLoading = false;
     });

    this.messageText = '';
  }
}
