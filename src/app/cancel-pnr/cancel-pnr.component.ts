import { Component, OnInit } from '@angular/core';
import {CancelPnrService} from './cancel-pnr.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-cancel-pnr',
  templateUrl: './cancel-pnr.component.html',
  styleUrls: ['./cancel-pnr.component.css']
})
export class CancelPnrComponent implements OnInit {

  pnr = '';
  pnrResponse = ' ';
  constructor(private service: CancelPnrService) { }

  ngOnInit() {
  }

    public cancelPnr() {
      this.service.cancelPnr(this.pnr).subscribe((posRes) => {
            console.log(posRes);
            this.pnrResponse = 'Pnr Cancellation Successful';
        }, (errRes: HttpErrorResponse) => {
            this.pnrResponse = 'Pnr Cancellation Failed';
            if (errRes.error instanceof Error) {
                console.log('client side error');
            } else {
                console.log('server side error' + errRes.error);
            }
        });
    }
}
