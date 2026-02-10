import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { Incident } from '../../../features/incidents/models/incident.model';
import { TableHeaderComponent } from '../atoms/table-header.component';

@Component({
    standalone: true,
    selector: 'ui-incidents-table',
    imports: [NgFor, TableHeaderComponent],
    template: `
    <table border="1" width="100%">
      <thead>
        <tr>
          <ui-table-header label="Title" />
          <ui-table-header label="Service" />
          <ui-table-header label="Status" />
          <ui-table-header label="Severity" />
        </tr>
      </thead>

      <tbody>
        <tr *ngFor="let i of incidents">
          <td>{{ i.title }}</td>
          <td>{{ i.service }}</td>
          <td>{{ i.status }}</td>
          <td>{{ i.severity }}</td>
        </tr>
      </tbody>
    </table>
  `,
})
export class IncidentsTableComponent {
    @Input({ required: true }) incidents!: Incident[];
}
