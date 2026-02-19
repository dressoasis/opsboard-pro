import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Incident } from '../../../features/incidents/models/incident.model';
import { TableHeaderComponent } from '../atoms/table-header.component';

@Component({
  standalone: true,
  selector: 'ui-incidents-table',
  imports: [NgFor, TableHeaderComponent, NgIf],
  template: `
    <table border="1" width="100%">
      <thead>
        <tr>
          <ui-table-header label="Title" />
          <ui-table-header label="Service" />
          <ui-table-header label="Status" />
          <ui-table-header label="Severity" />
          <ui-table-header label="Actions" />
        </tr>
      </thead>

      <tbody>
        <tr *ngFor="let i of incidents">
          <td>{{ i.title }}</td>
          <td>{{ i.service }}</td>
          <td>{{ i.status }}</td>
          <td>{{ i.severity }}</td>
          <td>
            <button *ngIf="isAdmin" (click)="edit.emit(i.id)">Edit</button>
            <button *ngIf="isAdmin" (click)="deleteIncident.emit(i.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
})
export class IncidentsTableComponent {

  @Input({ required: true }) incidents!: Incident[];
  @Input() isAdmin = false;
  @Output() edit = new EventEmitter<string>();
  @Output() deleteIncident = new EventEmitter<string>();
}
