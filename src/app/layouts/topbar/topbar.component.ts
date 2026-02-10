import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';

@Component({
    standalone: true,
    selector: 'app-topbar',
    template: `
    <header class="topbar">
      <strong>OpsBoard Pro</strong>

      <div class="user">
        {{ auth.user()?.email }}
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
    auth = inject(AuthService);
}
