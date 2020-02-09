import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class TicketPnrService {
    constructor(private http: HttpClient) {
    }
    public ticketPnr(ticketPnr: string): Observable<any> {
        let headersObject = new HttpHeaders();
        headersObject = headersObject.set('Content-Type', 'application/json');
        headersObject = headersObject.set('Authorization', 'Basic ' + btoa('admin:@dMin007!-'));
        const options = {
            headers: headersObject
        };
        return this.http.get('https://pnr-creation.mybluemix.net/sabrepnr/ticket/' + ticketPnr, options);
    }
}
