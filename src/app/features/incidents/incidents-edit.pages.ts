import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IncidentsFacade } from './incidents.facade';
import { IncidentsStore } from './store/incidents.store';
import { IncidentFormComponent } from '../../shared/ui/molecules/incident-form.component';
import { Incident } from './models/incident.model';

@Component({
    standalone: true,
    selector: 'app-incidents-edit-page',
    imports: [CommonModule, IncidentFormComponent],
    providers: [IncidentsFacade, IncidentsStore],
    template: `
    <h1>Edit Incident</h1>

    @if (incident) {
      <ui-incident-form
        [incident]="incident"
        (save)="onSave($event)">
      </ui-incident-form>
    } @else {
      <p>Incident not found.</p>
    }
  `,
})
export class IncidentsEditPage {

    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private facade = inject(IncidentsFacade);

    incident?: Incident;

    constructor() {
        const id = this.route.snapshot.paramMap.get('id');

        // Cargamos los incidents desde localStorage antes de buscar por ID
        this.facade.loadIncidents();

        if (id) {
            this.incident = this.facade.incidents().find(i => i.id === id);
        }
    }

    onSave(incident: Incident): void {
        this.facade.updateIncident(incident);
        this.router.navigate(['/incidents']);
    }
}
