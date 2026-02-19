import { Routes } from '@angular/router';
import { IncidentsPage } from './incidents.page';
import { IncidentsCreatePage } from './incidents-create.page';
import { IncidentsEditPage } from './incidents-edit.pages';

export const INCIDENTS_ROUTES: Routes = [
    { path: '', component: IncidentsPage },
    { path: 'create', component: IncidentsCreatePage },
    { path: ':id/edit', component: IncidentsEditPage },
];
