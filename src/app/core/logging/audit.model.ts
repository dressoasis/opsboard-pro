export interface AuditEvent {
    id: string;
    user: string;
    action: string;
    resource: string;
    timestamp: string;
    metadata?: Record<string, any>;
}
