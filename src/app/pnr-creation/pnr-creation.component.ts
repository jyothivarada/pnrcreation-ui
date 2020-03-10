import {Reservation} from '../model/reservation';
import {Component, OnInit} from '@angular/core';
import {PnrCreationService} from './pnrCreation.service';
import {HttpErrorResponse} from '@angular/common/http';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './pnr-creation.component.html',
    styleUrls: ['./pnr-creation.component.css']
})
export class PnrCreationComponent implements OnInit {
    title = 'pnrCreation';
    result: any;
    pnrDetails = ' ';
    pnr;
    reservation: Reservation = new Reservation();
    returnHidden = false;
    hide = 'ng-hide';
    myControl = new FormControl();
    options: string[] = ['F210M42 - Regular', 'F210M92 - Regular', 'F227M02 - Regular', 'F235M90 - Gold', 'F236M30 - Gold', 'F251M38 - Platinum', 'F252M04 - Platinum', 'F254M10 - Exec Plat', 'F258M06 - Exec Plat', '074JUN6 - Concierge key'];
    filteredOptions: Observable<string[]>;

    constructor(private service: PnrCreationService) {
        const depatureDate = new Date();
        const returnDate = new Date();
        depatureDate.setDate(depatureDate.getDate() + 30);
        this.reservation.departureDateUI = depatureDate;
        returnDate.setDate(returnDate.getDate() + 40);
        this.reservation.returnDateUI = returnDate;
        this.reservation.departureDate = (depatureDate.getMonth() + 1) + '/' + depatureDate.getDate() + '/' + depatureDate.getFullYear();
        this.reservation.returnDate = (returnDate.getMonth() + 1) + '/' + returnDate.getDate() + '/' + returnDate.getFullYear();
    }

    ngOnInit() {
        this.filteredOptions = this.myControl.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value))
            );
    }

    public tripTypeSelected() {
        this.reservation.tripType === 'OneWay' ? this.returnHidden = true : this.returnHidden = false;
    }

    public onChangeDeparture(dep: Date): void {
        this.reservation.departureDate = (dep.getMonth() + 1) + '/' + dep.getDate() + '/' + dep.getFullYear();
    }

    public onChangeReturn(returnDate: Date): void {
        this.reservation.returnDate = (returnDate.getMonth() + 1) + '/' + returnDate.getDate() + '/' + returnDate.getFullYear();
    }

    public submitData() {
        console.log(this.reservation.firstName);
        // const dep = this.reservation.departureDateUI;
        // const returnDate = this.reservation.returnDateUI;
        // this.reservation.departureDate = dep.getMonth() + '/' + dep.getDate() + '/' + dep.getFullYear();
        // this.reservation.returnDate = returnDate.getMonth() + '/' + returnDate.getDate() + '/' + returnDate.getFullYear();
        const spitted = this.reservation.frequentFlyerNumber.split('-');
        console.log(spitted);
        this.reservation.frequentFlyerNumber = spitted[0].trim();

        this.service.postData(this.reservation).subscribe((posRes) => {
            this.result = posRes;
            console.log(this.result.pnr);
            this.pnr = this.result.pnr;
            this.pnrDetails = 'PNR: ' + this.result.pnr + ' FirstName: ' + this.result.firstName + ' LastName: ' + this.result.lastName;
            this.hide = 'ng-show';
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

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }
}
