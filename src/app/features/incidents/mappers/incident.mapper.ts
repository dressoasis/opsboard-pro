import { Incident } from '../models/incident.model';
import { IncidentDto } from '../dto/incident.dto';

export class IncidentMapper {
    static fromDto(dto: IncidentDto): Incident {
        return {
            id: dto.id,
            title: dto.title,
            description: dto.description,
            service: dto.service_name,
            status: dto.status as any,
            severity: dto.severity as any,
            assignedTo: dto.assigned_to,
            createdAt: dto.created_at,
            updatedAt: dto.updated_at,
        };
    }
}
