import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class PnrInterceptor {

    intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {

        const req1 = req.clone({
            setHeaders: {
                'authorization' : 'admin,@dMin007!-'
            }
        });
        return handler.handle(req1);
    }
};