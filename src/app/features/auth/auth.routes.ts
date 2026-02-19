import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { AuthFacade } from './auth.fecade';
import { AuthStore } from './auth.store';

export const AUTH_ROUTES: Routes = [
    {
        path: '',
        component: LoginComponent,
        providers: [AuthFacade, AuthStore]
    },
];
