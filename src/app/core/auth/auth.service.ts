import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

export type UserRole = 'admin' | 'operator' | 'viewer';

export interface AuthUser {
    id: string;
    email: string;
    role: UserRole;
    token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly STORAGE_KEY = 'opsboard_auth';

    user = signal<AuthUser | null>(this.loadUser());

    constructor(private router: Router) { }

    login(email: string, password: string): boolean {
        // 🔴 Simulación controlada
        const role: UserRole =
            email.includes('admin') ? 'admin' :
                email.includes('ops') ? 'operator' : 'viewer';

        const user: AuthUser = {
            id: crypto.randomUUID(),
            email,
            role,
            token: 'fake-jwt-token',
        };

        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
        }
        this.user.set(user);

        return true;
    }

    logout(): void {
        if (typeof localStorage !== 'undefined') {
            localStorage.removeItem(this.STORAGE_KEY);
        }
        this.user.set(null);
        this.router.navigate(['/login']);
    }

    isAuthenticated(): boolean {
        return !!this.user();
    }

    hasRole(role: UserRole): boolean {
        return this.user()?.role === role;
    }

    private loadUser(): AuthUser | null {
        if (typeof localStorage !== 'undefined') {
            const raw = localStorage.getItem(this.STORAGE_KEY);
            return raw ? JSON.parse(raw) : null;
        }
        return null;
    }
}
