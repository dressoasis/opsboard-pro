import { Routes } from '@angular/router';
import { IncidentsPage } from './incidents.page';
import { IncidentsCreatePage } from './incidents-create.page';

export const INCIDENTS_ROUTES: Routes = [
    { path: '', component: IncidentsPage },
    { path: 'create', component: IncidentsCreatePage },
];
