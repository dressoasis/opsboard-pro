import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthFacade } from '../../features/auth/auth.facade';

export const authGuard: CanActivateFn = (route, state) => {
    const auth = inject(AuthFacade);
    const router = inject(Router);

    if (!auth.isAuthenticated()) {
        router.navigate(['/login']);
        return false;
    }

    return true;
};
