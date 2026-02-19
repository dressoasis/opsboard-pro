import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from './auth.facade';

@Component({
  standalone: true,
  template: `
    <h2>Login</h2>

    <input #username placeholder="username" />
    <input #password type="password" placeholder="password" />

    <button (click)="login(username.value, password.value)">
      Login
    </button>
  `,
})
export class LoginComponent {
  constructor(
    private auth: AuthFacade,
    private router: Router
  ) { }

  login(username: string, password: string) {
    const success = this.auth.login(username, password);
    if (success) {
      this.router.navigate(['/dashboard']);
    } else {
      alert('Login failed');
    }
  }
}
