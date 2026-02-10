export type IncidentStatus = 'open' | 'in_progress' | 'resolved';
export type IncidentSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface Incident {
    id: string;
    title: string;
    description: string;
    service: string;
    status: IncidentStatus;
    severity: IncidentSeverity;
    assignedTo?: string;
    createdAt: string;
    updatedAt: string;
}
