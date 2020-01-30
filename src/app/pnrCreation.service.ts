import { Reservation } from './reservation';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class pnrCreationService {
    constructor(private http: HttpClient) { }
    public postData(reservation: Reservation): Observable<any> {
        let headers_object = new HttpHeaders();
        headers_object = headers_object.set('Content-Type', 'application/json');
        headers_object = headers_object.set("Authorization", "Basic " + btoa("admin:@dMin007!-"));    
        let options = {
            headers:headers_object
        }
        return this.http.post("https://pnr-creation.mybluemix.net/sabrepnr/createReservation", reservation, options);
    };
};

