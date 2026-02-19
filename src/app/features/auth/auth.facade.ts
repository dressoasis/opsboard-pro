import { Injectable, inject } from '@angular/core';
import { AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthFacade {

    private readonly store = inject(AuthStore);

    // Expone el signal del usuario actual
    readonly currentUser = this.store.user;

    login(username: string, password: string): boolean {
        return this.store.login(username, password);
    }

    logout(): void {
        this.store.logout();
    }

    isAdmin(): boolean {
        return this.store.isAdmin();
    }

    isAuthenticated(): boolean {
        return !!this.currentUser();
    }

}
