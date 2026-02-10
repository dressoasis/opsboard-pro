import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
    standalone: true,
    selector: 'app-shell',
    imports: [RouterOutlet, SidenavComponent, TopbarComponent],
    template: `
    <div class="shell">
      <app-topbar />
      <div class="shell-body">
        <app-sidenav />
        <main class="content">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
})
export class ShellComponent { }
