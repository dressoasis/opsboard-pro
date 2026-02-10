import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
    standalone: true,
    template: `
    <h2>Login</h2>

    <input #email placeholder="email" />
    <input #password type="password" placeholder="password" />

    <button (click)="login(email.value, password.value)">
      Login
    </button>
  `,
})
export class LoginComponent {
    constructor(
        private auth: AuthService,
        private router: Router
    ) { }

    login(email: string, password: string) {
        this.auth.login(email, password);
        this.router.navigate(['/dashboard']);
    }
}
