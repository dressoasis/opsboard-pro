import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { AuditService } from '../../core/logging/audit.service';

@Component({
    standalone: true,
    imports: [NgFor],
    template: `
    <h1>Audit Log</h1>

    <table border="1" width="100%">
      <tr>
        <th>User</th>
        <th>Action</th>
        <th>Resource</th>
        <th>Date</th>
      </tr>

      <tr *ngFor="let e of audit.events()">
        <td>{{ e.user }}</td>
        <td>{{ e.action }}</td>
        <td>{{ e.resource }}</td>
        <td>{{ e.timestamp }}</td>
      </tr>
    </table>
  `,
})
export class AuditPage {
    audit = inject(AuditService);
}
