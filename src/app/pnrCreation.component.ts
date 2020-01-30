import { Reservation } from './reservation';
import { Component } from '@angular/core';
import { pnrCreationService } from './pnrCreation.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './pnrCreation.component.html',
  styleUrls: ['./app.component.css']
})
export class pnrCreationComponent {
  title = 'pnrCreation';
  result: any;
  pnr = "";
  constructor(private service: pnrCreationService) { }
  reservation: Reservation = new Reservation();
 // this.reservation.tripType = "RoundTrip";

  public submitData() {
    //this.result = {"pnr":""};
    //this.result["pnr"] = "";
    console.log(this.reservation.firstName);
    this.service.postData(this.reservation).subscribe((posRes) => { 
      this.result = posRes; 
      console.log(this.result);
      console.log(this.result.pnr);
      this.pnr = this.result.pnr;
    }, (errRes: HttpErrorResponse) => {
      if (errRes.error instanceof Error) {
        console.log("client side error");
      }
      else
        console.log("server side error");
    });

  };
};
