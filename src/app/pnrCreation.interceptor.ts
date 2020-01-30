import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import { HttpRequest, HttpHandler,HttpEvent } from '@angular/common/http';

@Injectable({
    providedIn:"root"
})

export class myInterceptor{

    intercept(req:HttpRequest<any>,handler:HttpHandler):Observable<HttpEvent<any>>{

        const req1=req.clone({
            setHeaders:{
            "authorization":"admin,@dMin007!-"
        }
        });
        return handler.handle(req1);
    }
};