import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SeatLayoutComponent } from './components/seat-layout/seat-layout.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { BookingFormComponent } from './components/booking-form/booking-form.component';
import { ModalComponent } from './components/shared/modal/modal.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { ToastComponent } from './components/shared/toast/toast.component';

const routes: Routes = [
  { path: '', redirectTo: '/booking', pathMatch: 'full' },
  { path: 'booking', component: SeatLayoutComponent },
  { path: 'booking-list', component: BookingListComponent },
  { path: 'admin', component: AdminPanelComponent },
  { path: 'admin/bus/:id', component: SeatLayoutComponent },
  { path: '**', redirectTo: '/booking' }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SeatLayoutComponent,
    AdminPanelComponent,
    BookingFormComponent,
    ModalComponent,
    NavbarComponent,
    BookingListComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
