import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
navLinks=[
  
  {path:"pnrCreation",label:"pnrCreation"},
  {path:"cancelPnr",label:"cancelPnr"},
  {path:"ticketPnr",label:"ticketPnr"}
];
  constructor() { }

  ngOnInit() {
    

  }
}
