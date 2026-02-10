import { Injectable, inject } from '@angular/core';
import { IncidentsStore } from './store/incidents.store';
import { Incident } from './models/incident.model';
import { AuditService } from '../../core/logging/audit.service';

@Injectable()
export class IncidentsFacade {
    private store = inject(IncidentsStore);
    private audit = inject(AuditService);

    incidents = this.store.incidents;

    loadIncidents() {
        const mock: Incident[] = [
            {
                id: '1',
                title: 'API Down',
                description: 'Payments service not responding',
                service: 'payments',
                status: 'open',
                severity: 'critical',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
        ];

        this.store.setIncidents(mock);
        this.audit.log('LOAD', 'INCIDENT');
    }

    createIncident(data: Incident) {
        this.store.addIncident(data);
        this.audit.log('CREATE', 'INCIDENT', { id: data.id });
    }
}
