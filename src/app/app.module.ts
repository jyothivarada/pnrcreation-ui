import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule, MatExpansionModule, MatGridListModule, MatCheckboxModule, MatAutocompleteModule} from '@angular/material';
import {MatCardModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material';
import {MatNativeDateModule} from '@angular/material';

import {MatIconModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material';
import {MatTooltipModule} from '@angular/material';
import {MatSnackBarModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatTabsModule} from '@angular/material/tabs';
import {PnrCreationComponent} from './pnr-creation/pnr-creation.component';
import {CancelPnrComponent} from './cancel-pnr/cancel-pnr.component';
import {TicketPnrComponent} from './ticket-pnr/ticket-pnr.component';
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {LoaderComponent} from './loader/loader.component';
import { LoaderService } from './loader/loader.service';
import {LoaderInterceptor} from './interceptors/loader.interceptor';
import { PnrDetailsComponent } from './pnr-details/pnr-details.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const appRoutes: Routes = [{path: '', component: PnrCreationComponent},
    {path: 'createPnr', component: PnrCreationComponent},
    {path: 'cancelPnr', component: CancelPnrComponent},
    {path: 'ticketPnr', component: TicketPnrComponent},
    {path: 'pnrDetails', component: PnrDetailsComponent}];


@NgModule({
    declarations: [
        PnrCreationComponent,
        CancelPnrComponent,
        TicketPnrComponent,
        HomeComponent,
        LoaderComponent,
        PnrDetailsComponent
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
        MatCardModule,
        MatExpansionModule,
        MatGridListModule,
        MatCheckboxModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatIconModule,
        MatTooltipModule,
        MatSnackBarModule,
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
