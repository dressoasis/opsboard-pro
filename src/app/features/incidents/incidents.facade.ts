import { Injectable, inject } from '@angular/core';
import { IncidentsStore, IncidentFilters } from './store/incidents.store';
import { Incident } from './models/incident.model';
import { AuditService } from '../../core/logging/audit.service';

const STORAGE_KEY = 'incidents';

@Injectable()
export class IncidentsFacade {

    // 🔹 Dependencias
    private readonly store = inject(IncidentsStore);
    private readonly audit = inject(AuditService);

    // 🔹 Exposición reactiva
    readonly incidents = this.store.filteredIncidents;

    // 🔹 Carga inicial (localStorage → fallback mock)
    loadIncidents(): void {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved) {
            const parsed: Incident[] = JSON.parse(saved);
            this.store.setIncidents(parsed);
            this.audit.log('LOAD_STORAGE', 'INCIDENT');
            return;
        }

        // 🔹 Mock inicial si no hay datos
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
        this.persist(mock);
        this.audit.log('LOAD_MOCK', 'INCIDENT');
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
        this.persist(this.store.getAll());
        this.audit.log('CREATE', 'INCIDENT', incident);
    }

    // 🔹 Actualizar incidente
    updateIncident(data: Incident): void {
        const incident: Incident = {
            ...data,
            updatedAt: new Date().toISOString(),
        };

        this.store.updateIncident(incident);
        this.persist(this.store.getAll());
        this.audit.log('UPDATE', 'INCIDENT', incident);
    }

    // 🔹 Eliminar incidente (ya que estamos completando todo)
    deleteIncident(id: string): void {
        this.store.deleteIncident(id);
        this.persist(this.store.getAll());
        this.audit.log('DELETE', 'INCIDENT', { id });
    }

    // 🔹 Persistencia privada
    private persist(data: Incident[]): void {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
}
