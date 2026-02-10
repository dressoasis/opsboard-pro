import { Injectable, signal } from '@angular/core';
import { AuditEvent } from './audit.model';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuditService {
    private readonly _events = signal<AuditEvent[]>([]);
    events = this._events.asReadonly();

    constructor(private auth: AuthService) { }

    log(action: string, resource: string, metadata?: any) {
        const user = this.auth.user();

        const event: AuditEvent = {
            id: crypto.randomUUID(),
            user: user?.email ?? 'anonymous',
            action,
            resource,
            timestamp: new Date().toISOString(),
            metadata,
        };

        this._events.update(list => [event, ...list].slice(0, 200));
    }
}
