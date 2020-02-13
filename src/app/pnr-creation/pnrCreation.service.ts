import { Reservation } from '../model/reservation';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class PnrCreationService {
    constructor(private http: HttpClient) { }
    public postData(reservation: Reservation): Observable<any> {
        let headersObject = new HttpHeaders();
        headersObject = headersObject.set('Content-Type', 'application/json');
        headersObject = headersObject.set('Authorization', 'Basic ' + btoa('admin:@dMin007!-'));
        const options = {
            headers : headersObject
        };
        return this.http.post('https://pnr-creation.mybluemix.net/sabrepnr/createReservation', reservation, options);
    }
}


