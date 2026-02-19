import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthFacade } from '../../features/auth/auth.facade';

@Component({
  standalone: true,
  selector: 'app-sidenav',
  imports: [RouterLink, NgIf],
  template: `
    <aside class="sidenav">
      <a routerLink="/dashboard">Dashboard</a>
      <a routerLink="/incidents">Incidents</a>

      <a
        *ngIf="auth.isAdmin()"
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
  auth = inject(AuthFacade);
}
