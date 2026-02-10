import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentsFacade } from './incidents.facade';
import { IncidentsStore } from './store/incidents.store';
import { IncidentFormComponent } from '../../shared/ui/molecules/incident-form.component';
import { Incident } from './models/incident.model';

@Component({
    standalone: true,
    selector: 'app-incidents-create-page',
    imports: [CommonModule, IncidentFormComponent],
    providers: [IncidentsFacade, IncidentsStore],
    template: `
    <h1>Create Incident</h1>

    <ui-incident-form
      (save)="onSave($event)">
    </ui-incident-form>
  `,
})
export class IncidentsCreatePage {

    constructor(private facade: IncidentsFacade) { }

    onSave(incident: Incident): void {
        this.facade.createIncident(incident);
    }
}
