import {Reservation} from '../model/reservation';
import {Component} from '@angular/core';
import {PnrCreationService} from './pnrCreation.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './pnr-creation.component.html',
    styleUrls: ['./pnr-creation.component.css']
})
export class PnrCreationComponent {
    title = 'pnrCreation';
    result: any;
    pnrDetails = ' ';
    pnr;
    reservation: Reservation = new Reservation();
    returnHidden = false;

    constructor(private service: PnrCreationService) {
        const depatureDate = new Date();
        const returnDate = new Date();
        depatureDate.setDate(depatureDate.getDate() + 30);
        this.reservation.departureDateUI = depatureDate;
        returnDate.setDate(returnDate.getDate() + 40);
        this.reservation.returnDateUI = returnDate;
    }

    // this.reservation.tripType = 'RoundTrip';
    public tripTypeSelected() {
        this.reservation.tripType === 'OneWay' ? this.returnHidden = true : this.returnHidden = false;
    }

    public submitData() {
        console.log(this.reservation.firstName);
        const dep = this.reservation.departureDateUI;
        const returnDate = this.reservation.returnDateUI;
        this.reservation.departureDate = dep.getMonth() + '/' + dep.getDate() + '/' + dep.getFullYear();
        this.reservation.returnDate = returnDate.getMonth() + '/' + returnDate.getDate() + '/' + returnDate.getFullYear();
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
        if (this.pnr) {
            url = url + '/reservation/view/find-your-trip?firstName=' + this.reservation.firstName + '&lastName=' + this.reservation.lastName + '&recordLocator=' + this.pnr;
            window.open('https://' + url, '_blank');
        }
    }
}
