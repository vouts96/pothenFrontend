import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'https://taxisnet.dslab.ece.ntua.gr:5000/generate';

  constructor(private http: HttpClient) {}

  // Function to send a prompt to Ollama
  sendMessage(prompt: string, model: string = 'pothen-assistant:latest'): Observable<any> {
    const requestBody = {
      model: model,  // Model to use (default: mistral)
      prompt: prompt, // User's question
      stream: false   // Ensures response comes all at once
    };

    return this.http.post<any>(this.apiUrl, requestBody);
  }
}
