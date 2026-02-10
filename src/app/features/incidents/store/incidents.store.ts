import { signal } from '@angular/core';
import { Incident } from '../models/incident.model';

export class IncidentsStore {
    private readonly _incidents = signal<Incident[]>([]);

    incidents = this._incidents.asReadonly();

    setIncidents(data: Incident[]) {
        this._incidents.set(data);
    }

    addIncident(incident: Incident) {
        this._incidents.update(list => [...list, incident]);
    }

    updateIncident(updated: Incident) {
        this._incidents.update(list =>
            list.map(i => (i.id === updated.id ? updated : i))
        );
    }
}
