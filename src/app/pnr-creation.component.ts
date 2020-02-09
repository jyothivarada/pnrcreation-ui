import {Reservation} from './reservation';
import {Component} from '@angular/core';
import {PnrCreationService} from './pnrCreation.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './pnr-creation.component.html',
    styleUrls: ['./app.component.css']
})
export class PnrCreationComponent {
    title = 'pnrCreation';
    result: any;
    pnrDetails = ' ';
    pnr;
    reservation: Reservation = new Reservation();
    returnHidden = false;

    constructor(private service: PnrCreationService) {
    }

    // this.reservation.tripType = 'RoundTrip';
    public tripTypeSelected() {
        this.reservation.tripType === 'OneWay' ? this.returnHidden = true : this.returnHidden = false;
    }

    public submitData() {
        console.log(this.reservation.firstName);
        this.service.postData(this.reservation).subscribe((posRes) => {
            this.result = posRes;
            console.log(this.result.pnr);
            this.pnr = this.result.pnr;
            this.pnrDetails = 'PNR: ' + this.result.pnr + ' FirstName: ' + this.result.firstName + ' LastName: ' + this.result.lastName;
        }, (errRes: HttpErrorResponse) => {
            if (errRes.error instanceof Error) {
                console.log('client side error');
            } else {
                console.log('server side error');
            }
        });

    }

    public openUrl(url) {
        url = url + '/reservation/view/find-your-trip?firstName=' + this.reservation.firstName + '&lastName=' + this.reservation.lastName + '&recordLocator=' + this.pnr;
        window.open('https://' + url, '_blank');
    }
}
