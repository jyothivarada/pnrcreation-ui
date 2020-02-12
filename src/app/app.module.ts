import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule, MatNativeDateModule, MatRadioModule, MatSpinner} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {PnrCreationComponent} from './pnr-creation.component';
import {CancelPnrComponent} from './cancel-pnr/cancel-pnr.component';
import {TicketPnrComponent} from './ticket-pnr/ticket-pnr.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {LoaderComponent} from './loader/loader.component';
import { LoaderService } from './services/loader.service';
import {LoaderInterceptor} from './interceptors/loader.interceptor';

const appRoutes: Routes = [{path: '', component: PnrCreationComponent},
    {path: 'createPnr', component: PnrCreationComponent},
    {path: 'cancelPnr', component: CancelPnrComponent},
    {path: 'ticketPnr', component: TicketPnrComponent}];

@NgModule({
    declarations: [
        PnrCreationComponent,
        CancelPnrComponent,
        TicketPnrComponent,
        HomeComponent,
        LoaderComponent
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
        MatRadioModule,
        MatProgressSpinnerModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [
        LoaderService,
        { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
    ],
    bootstrap: [HomeComponent]
})
export class AppModule {


}
