import { Component, input } from '@angular/core';
import { Message } from '../../shared/interfaces/message';

@Component({
  standalone: true,
  selector: 'app-message-list',
  template: `
    <ul class="gradient-bg">
      @for (message of messages(); track message.created){
      <li>
        <div class="avatar animate-in-primary">
          <img
            src="https://api.dicebear.com/7.x/bottts/svg?seed={{
              message.author.split('@')[0]
            }}"
          />
        </div>
        <div class="message animate-in-secondary">
          <small>{{ message.author }}</small>
          <p>
            {{ message.content }}
          </p>
        </div>
      </li>
      }
    </ul>
  `,
})
export class MessageListComponent {
  messages = input.required<Message[]>();
}
