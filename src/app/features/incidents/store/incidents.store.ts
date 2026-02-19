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

  // 🔹 Estado base readonly
  readonly incidents = this._incidents.asReadonly();

  // 🔹 Selector filtrado
  readonly filteredIncidents = computed(() => {
    const incidents = this._incidents();
    const filters = this._filters();

    return incidents.filter(i =>
      (!filters.status || i.status === filters.status) &&
      (!filters.severity || i.severity === filters.severity) &&
      (!filters.service || i.service === filters.service)
    );
  });

  // 🔹 Obtener todos (para persistencia)
  getAll(): Incident[] {
    return this._incidents();
  }

  // 🔹 Obtener por ID (para edit limpio)
  getById(id: string): Incident | undefined {
    return this._incidents().find(i => i.id === id);
  }

  // 🔹 Set inicial
  setIncidents(data: Incident[]): void {
    this._incidents.set(data);
  }

  // 🔹 Filtros
  setFilters(filters: IncidentFilters): void {
    this._filters.set(filters);
  }

  // 🔹 Crear
  addIncident(incident: Incident): void {
    this._incidents.update(current => [
      ...current,
      incident
    ]);
  }

  // 🔹 Actualizar
  updateIncident(updated: Incident): void {
    this._incidents.update(current =>
      current.map(i =>
        i.id === updated.id ? updated : i
      )
    );
  }

  // 🔹 Eliminar
  deleteIncident(id: string): void {
    this._incidents.update(current =>
      current.filter(i => i.id !== id)
    );
  }
}
