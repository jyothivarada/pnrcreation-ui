import {Component, OnInit} from '@angular/core';
import {TicketPnrService} from './ticket-pnr.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-ticket-pnr',
    templateUrl: './ticket-pnr.component.html',
    styleUrls: ['./ticket-pnr.component.css']
})
export class TicketPnrComponent implements OnInit {

    pnr = '';
    pnrResponse = '';
    constructor(private service: TicketPnrService) {
    }

    ngOnInit() {
    }

    public ticketPnr() {
        this.service.ticketPnr(this.pnr).subscribe((posRes) => {
            console.log(posRes);
            this.pnrResponse = 'Pnr Ticketed Successful';
        }, (errRes: HttpErrorResponse) => {
            this.pnrResponse = 'Pnr Ticketed Failed';
            if (errRes.error instanceof Error) {
                console.log('client side error');
            } else {
                console.log('server side error' + errRes.error);
            }
        });
    }

}
