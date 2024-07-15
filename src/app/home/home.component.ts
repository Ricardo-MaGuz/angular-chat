import { Component, inject } from '@angular/core';
import { MessageListComponent } from './ui/message-list.component';
import { MessageService } from '../shared/data-access/message.service';
import { MessageInputComponent } from './ui/message-input.component';

@Component({
  standalone: true,
  selector: 'app-home',
  template: `
    <div class="container">
      <app-message-list [messages]="messageService.messages()" />
      <app-message-input (send)="messageService.add$.next($event)" />
    </div>
  `,
  imports: [MessageListComponent, MessageInputComponent],
})
export default class HomeComponent {
  messageService = inject(MessageService);
}
