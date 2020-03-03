import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {PnrDetailsService} from '../pnr-details/pnr-details.service';

@Component({
    selector: 'app-pnr-details',
    templateUrl: './pnr-details.component.html',
    styleUrls: ['./pnr-details.component.css']
})
export class PnrDetailsComponent implements OnInit {

    pnr = '';
    pnrResponse = ' ';

    constructor(private service: PnrDetailsService) {
    }

    ngOnInit() {
    }

    public pnrDetails() {
        this.service.pnrDetails(this.pnr).subscribe((posRes) => {
            console.log(posRes.response);
            this.pnrResponse = posRes.response;
        }, (errRes: HttpErrorResponse) => {
            if (errRes.error instanceof Error) {
                console.log('client side error');
            } else {
                console.log('server side error' + errRes.error);
            }
        });
    }
}
