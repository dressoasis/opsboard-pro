import { Injectable, signal } from '@angular/core';

export type UserRole = 'admin' | 'user';

export interface AuthUser {
    username: string;
    role: UserRole;
}

@Injectable({ providedIn: 'root' })
export class AuthStore {

    private readonly _user = signal<AuthUser | null>(null);

    // Signal público para exponer el usuario actual
    readonly user = this._user.asReadonly();

    private readonly users = [
        { username: 'admin', password: '1234', role: 'admin' as const },
        { username: 'user', password: '1234', role: 'user' as const },
    ];

    login(username: string, password: string): boolean {
        const found = this.users.find(
            u => u.username === username && u.password === password
        );

        if (!found) return false;

        this._user.set({
            username: found.username,
            role: found.role,
        });

        return true;
    }

    logout(): void {
        this._user.set(null);
    }

    isAdmin(): boolean {
        return this._user()?.role === 'admin';
    }

    getRole(): UserRole | null {
        return this._user()?.role ?? null;
    }
}