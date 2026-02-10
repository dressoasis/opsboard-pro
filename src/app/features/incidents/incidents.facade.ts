import { Injectable, inject } from '@angular/core';
import { IncidentsStore, IncidentFilters } from './store/incidents.store';
import { Incident } from './models/incident.model';
import { AuditService } from '../../core/logging/audit.service';

@Injectable()
export class IncidentsFacade {

    // 🔹 Dependencias
    private readonly store = inject(IncidentsStore);
    private readonly audit = inject(AuditService);

    // 🔹 Exposición de datos (readonly)
    readonly incidents = this.store.filteredIncidents;

    // 🔹 Carga inicial (mock / futura API)
    loadIncidents(): void {
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
            {
                id: '2',
                title: 'Slow response',
                description: 'Orders API latency',
                service: 'orders',
                status: 'in_progress',
                severity: 'medium',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
        ];

        this.store.setIncidents(mock);
        this.audit.log('LOAD', 'INCIDENT');
    }

    // 🔹 Filtros
    applyFilters(filters: IncidentFilters): void {
        this.store.setFilters(filters);
        this.audit.log('FILTER', 'INCIDENT', filters);
    }

    // 🔹 Crear incidente
    createIncident(data: Incident): void {
        const incident: Incident = {
            ...data,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        this.store.addIncident(incident);
        this.audit.log('CREATE', 'INCIDENT', incident);
    }

    // 🔹 Actualizar incidente
    updateIncident(data: Incident): void {
        const incident: Incident = {
            ...data,
            updatedAt: new Date().toISOString(),
        };

        this.store.updateIncident(incident);
        this.audit.log('UPDATE', 'INCIDENT', incident);
    }
}
