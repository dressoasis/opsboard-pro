import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
    standalone: true,
    selector: 'app-sidenav',
    imports: [RouterLink],
    template: `
    <aside class="sidenav">
      <a routerLink="/dashboard">Dashboard</a>
      <a routerLink="/incidents">Incidents</a>

      <a
        *ngIf="auth.hasRole('admin')"
        routerLink="/audit"
      >
        Audit
      </a>
    </aside>
  `,
    styles: [`
    .sidenav {
      width: 200px;
      background: #0f172a;
      color: white;
      padding: 12px;
    }
    a {
      display: block;
      color: white;
      margin-bottom: 8px;
      text-decoration: none;
    }
  `],
})
export class SidenavComponent {
    auth = inject(AuthService);
}
