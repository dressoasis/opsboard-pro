import { Component, OnInit } from '@angular/core';
import { IncidentsFacade } from './incidents.facade';
import { IncidentsStore } from './store/incidents.store';
import { IncidentsTableComponent } from '../../shared/ui/molecules/incidents-table.component';

@Component({
    standalone: true,
    imports: [IncidentsTableComponent],
    providers: [IncidentsFacade, IncidentsStore],
    template: `
    <h1>Incidents</h1>

    <section style="margin-bottom: 16px;">
        <button routerLink="/incidents/create">
  Create Incident
</button>

      <select (change)="onFilterChange($event)">
        <option value="">All Status</option>
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="resolved">Resolved</option>
      </select>

      <select (change)="onFilterChange($event, 'severity')">
        <option value="">All Severity</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="critical">Critical</option>
      </select>
    </section>

    <ui-incidents-table
      [incidents]="facade.incidents()"
    />
  `,
})
export class IncidentsPage implements OnInit {
    private currentFilters: any = {};

    constructor(public facade: IncidentsFacade) { }

    ngOnInit() {
        this.facade.loadIncidents();
    }

    onFilterChange(event: Event, key: string = 'status') {
        const value = (event.target as HTMLSelectElement).value;
        this.currentFilters[key] = value || undefined;
        this.facade.applyFilters(this.currentFilters);
    }
}
