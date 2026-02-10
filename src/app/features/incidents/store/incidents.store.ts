import { signal, computed } from '@angular/core';
import { Incident } from '../models/incident.model';

export interface IncidentFilters {
    status?: string;
    severity?: string;
    service?: string;
}

export class IncidentsStore {
    private readonly _incidents = signal<Incident[]>([]);
    private readonly _filters = signal<IncidentFilters>({});

    incidents = this._incidents.asReadonly();

    filteredIncidents = computed(() => {
        const incidents = this._incidents();
        const filters = this._filters();

        return incidents.filter(i => {
            return (
                (!filters.status || i.status === filters.status) &&
                (!filters.severity || i.severity === filters.severity) &&
                (!filters.service || i.service === filters.service)
            );
        });
    });

    setIncidents(data: Incident[]) {
        this._incidents.set(data);
    }

    setFilters(filters: IncidentFilters) {
        this._filters.set(filters);
    }

    addIncident(incident: Incident) {
        this._incidents.update(current => [
            ...current,
            incident
        ]);
    }

    updateIncident(updated: Incident) {
        this._incidents.update(current =>
            current.map(i =>
                i.id === updated.id ? updated : i
            )
        );
    }

    deleteIncident(id: string) {
        this._incidents.update(current =>
            current.filter(i => i.id !== id)
        );
    }
}
