import { Component, OnInit } from '@angular/core';
import { IncidentsFacade } from './incidents.facade';
import { IncidentsStore } from './store/incidents.store';
import { NgFor } from '@angular/common';

@Component({
    standalone: true,
    imports: [NgFor],
    providers: [IncidentsFacade, IncidentsStore],
    template: `
    <h1>Incidents</h1>

    <ul>
      <li *ngFor="let i of facade.incidents()">
        {{ i.title }} - {{ i.status }} - {{ i.severity }}
      </li>
    </ul>
  `,
})
export class IncidentsPage implements OnInit {
    constructor(public facade: IncidentsFacade) { }

    ngOnInit() {
        this.facade.loadIncidents();
    }
}
