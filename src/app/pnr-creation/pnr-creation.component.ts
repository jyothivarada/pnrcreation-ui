import {Reservation} from '../model/reservation';
import {Component, OnInit} from '@angular/core';
import {PnrCreationService} from './pnrCreation.service';
import {HttpErrorResponse} from '@angular/common/http';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
import {FrequentFlyer} from "../model/FrequentFlyer";
import { _ } from 'underscore';

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
    frequentFlyers = [];
    myControl = new FormControl();
    options: string[] = ['F210M42 - Regular',
        'F235M90 - Gold', 'F251M38 - Platinum',
        'F254M10 - Exec Plat',
        '074JUN6 - Concierge key',
        'F210M92 - Regular',
        'F227M02 - Regular',
        'F236M30 - Gold',
        'F252M04 - Platinum',
        'F258M06 - Exec Plat'];
    filteredOptions: Observable<string[]>;
    errorMessage = '';

    constructor(private service: PnrCreationService, private _snackBar: MatSnackBar) {
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
        this.frequentFlyers.push(this.createFrequentFlyer('Main', 'MobileTest', 'F210M42 - Regular'));
        this.frequentFlyers.push(this.createFrequentFlyer('Gold', 'MobileTest', 'F235M90 - Gold'));
        this.frequentFlyers.push(this.createFrequentFlyer('Plat', 'MobileTest', 'F251M38 - Plat'));
        this.frequentFlyers.push(this.createFrequentFlyer('Exec', 'MobileTest', 'F258M06 - Exec Platinum'));
        // this.frequentFlyers.push(this.createFrequentFlyer('Main', 'AMRB', '074JUN6 - Concierge key'));
        this.frequentFlyers.push(this.createFrequentFlyer('Gold', 'MobileTest', 'F236M30 - Gold'));
        this.frequentFlyers.push(this.createFrequentFlyer('Plat', 'MobileTest', 'F252M04 - Platinum'));

    }

    public copyInputMessage(inputElement) {
        inputElement.select();
        document.execCommand('copy');
        inputElement.setSelectionRange(0, 0);
        if (this.pnr) {
            this._snackBar.open('PNR details copied', '', {
                duration: 2000,
            });
        }
    }

    public changeFrequentFlyer(inputElement) {
        if (_.findWhere(this.frequentFlyers, {number: inputElement})) {
            const selectedValue = _.findWhere(this.frequentFlyers, {number: inputElement});
            this.reservation.lastName = selectedValue.lastName;
            this.reservation.firstName = selectedValue.firstName;
        }
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
        const spitted = this.reservation.frequentFlyerNumber.split('-');
        this.reservation.frequentFlyerNumber = spitted[0].trim();
        this.pnrDetails = ' ';
        this.service.postData(this.reservation).subscribe((posRes) => {
            this.result = posRes;
            console.log(this.result.pnr);
            this.pnr = this.result.pnr;
            if (this.pnr) {
                this.pnrDetails = 'PNR: ' + this.pnr + ', FirstName: ' + this.result.firstName + ', LastName: ' + this.result.lastName;
                this.hide = 'ng-show';
            } else {
                this.errorMessage = 'PNR creation failed';
                setTimeout( () => {
                    this.errorMessage = '';
                }, 3000);
            }
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
        return this.frequentFlyers.filter(option => option.number.toLowerCase().includes(filterValue));
    }

    private createFrequentFlyer(firstName, lastName, frequentFlyerNumber) {
        const frequentFlyer = new FrequentFlyer();
        frequentFlyer.firstName = firstName;
        frequentFlyer.lastName = lastName;
        frequentFlyer.number = frequentFlyerNumber;
        return frequentFlyer;
    }
}
