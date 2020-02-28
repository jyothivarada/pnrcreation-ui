import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class PnrDetailsService {
    constructor(private http: HttpClient) { }
    public pnrDetails(pnr: string): Observable<any> {
        let headersObject = new HttpHeaders();
        headersObject = headersObject.set('Content-Type', 'application/json');
        headersObject = headersObject.set('Authorization', 'Basic ' + btoa('admin:@dMin007!-'));
        const options = {
            headers : headersObject
        };
        return this.http.get('https://pnr-creation.mybluemix.net/sabrepnr/pnrdetails/' + pnr, options);
    }
}


