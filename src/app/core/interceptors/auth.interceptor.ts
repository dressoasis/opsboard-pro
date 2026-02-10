import { inject } from '@angular/core';
import {
    HttpEvent,
    HttpHandlerFn,
    HttpInterceptorFn,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
    const auth = inject(AuthService);
    const user = auth.user();

    const headers: Record<string, string> = {
        'X-Correlation-Id': crypto.randomUUID(),
    };

    if (user?.token) {
        headers['Authorization'] = `Bearer ${user.token}`;
    }

    const authReq = req.clone({ setHeaders: headers });

    return next(authReq);
};
