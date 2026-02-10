export interface IncidentDto {
  id: string;
  title: string;
  description: string;
  service_name: string;
  status: string;
  severity: string;
  assigned_to?: string;
  created_at: string;
  updated_at: string;
}
