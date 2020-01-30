import { myInterceptor } from './pnrCreation.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {MatInputModule} from '@angular/material/input';
import { MatDatepickerModule,MatNativeDateModule } from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {MatTabsModule} from '@angular/material/tabs';
import { pnrCreationComponent } from './pnrCreation.component';
import { CancelPnrComponent } from './cancel-pnr/cancel-pnr.component';
import { TicketPnrComponent } from './ticket-pnr/ticket-pnr.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import { HomeComponent } from './home/home.component';
import { RouterModule,Routes } from "@angular/router";
const appRoutes:Routes=[{path:"",component:pnrCreationComponent},
{path:"createPnr",component:pnrCreationComponent},
{path:"cancelPnr",component:CancelPnrComponent},
{path:"ticketPnr",component:TicketPnrComponent}];

@NgModule({
  declarations: [
    pnrCreationComponent,
    CancelPnrComponent,
    TicketPnrComponent,
        HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    MatTabsModule,
    MatToolbarModule,
    RouterModule.forRoot(appRoutes)
 ],
  // providers: [{provide:HTTP_INTERCEPTORS,
  //   useClass:myInterceptor,
  // multi:true}],

  bootstrap: [HomeComponent]
})
export class AppModule {


 }
