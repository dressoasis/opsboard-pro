import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { IncidentsFacade } from './incidents.facade';
import { IncidentsStore } from './store/incidents.store';
import { IncidentsTableComponent } from '../../shared/ui/molecules/incidents-table.component';
import { Router } from '@angular/router';
import { AuthFacade } from '../auth/auth.facade';

@Component({
  standalone: true,
  imports: [IncidentsTableComponent, RouterLink, NgIf],
  providers: [IncidentsFacade, IncidentsStore],
  template: `
    <h1>Incidents</h1>

    <section style="margin-bottom: 16px;">
      <button *ngIf="authFacade.isAdmin()" routerLink="/incidents/create">
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
      [isAdmin]="authFacade.isAdmin()"
      (edit)="goToEdit($event)"
      (deleteIncident)="confirmDelete($event)">
    </ui-incidents-table>


  `,
})
export class IncidentsPage implements OnInit {
  private currentFilters: any = {};

  constructor(private router: Router,
    public authFacade: AuthFacade,
    public facade: IncidentsFacade) { }

  ngOnInit() {
    this.facade.loadIncidents();
  }

  onFilterChange(event: Event, key: string = 'status') {
    const value = (event.target as HTMLSelectElement).value;
    this.currentFilters[key] = value || undefined;
    this.facade.applyFilters(this.currentFilters);
  }

  goToEdit(id: string) {
    this.router.navigate(['/incidents', id, 'edit']);
  }
  confirmDelete(id: string): void {
    const confirmed = window.confirm('Are you sure you want to delete this incident?');

    if (!confirmed) return;

    this.facade.deleteIncident(id);
  }




}
