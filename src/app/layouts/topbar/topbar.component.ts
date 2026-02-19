import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { AuthFacade } from '../../features/auth/auth.facade';

@Component({
  standalone: true,
  selector: 'app-topbar',
  imports: [NgIf],
  template: `
    <header class="topbar">
      <strong>OpsBoard Pro</strong>

      <div class="user" *ngIf="auth.currentUser() as user">
        {{ user.username }}
        <button (click)="auth.logout()">Logout</button>
      </div>
    </header>
  `,
  styles: [`
    .topbar {
      display: flex;
      justify-content: space-between;
      padding: 12px;
      background: #1e293b;
      color: white;
    }
    button {
      margin-left: 12px;
    }
  `],
})
export class TopbarComponent {
  auth = inject(AuthFacade);
}
