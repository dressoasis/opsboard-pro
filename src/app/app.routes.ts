import { Routes } from '@angular/router';
import { ShellComponent } from './layouts/shell/shell.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadChildren: () =>
            import('./features/auth/auth.routes')
                .then(m => m.AUTH_ROUTES),
    },
    {
        path: '',
        component: ShellComponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'dashboard',
                loadChildren: () =>
                    import('./features/dashboard/dashboard.routes')
                        .then(m => m.DASHBOARD_ROUTES),
            },
        ],
    },
    {
        path: '**',
        redirectTo: 'dashboard',
    },
    {
        path: 'incidents',
        loadChildren: () =>
            import('./features/incidents/incidents.routes')
                .then(m => m.INCIDENTS_ROUTES),
    },
    {
        path: 'audit',
        loadChildren: () =>
            import('./features/audit/audit.routes')
                .then(m => m.AUDIT_ROUTES),
    },


];
