import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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

  private facade = inject(IncidentsFacade);
  private router = inject(Router);

  onSave(incident: Incident): void {
    this.facade.createIncident(incident);

    // ✅ navegación automática
    this.router.navigate(['/incidents']);
  }
}
