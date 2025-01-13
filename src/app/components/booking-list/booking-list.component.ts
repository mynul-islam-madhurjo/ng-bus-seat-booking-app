import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Booking } from '../../models/booking.interface';

@Component({
  selector: 'app-booking-list',
  template: `
    <div class="booking-list-container">
      <h2>Current Bookings</h2>
      <div class="booking-grid">
        <div class="booking-card" *ngFor="let booking of bookings">
          <div class="booking-header">
            <span class="seat-number">Seat {{booking.seatNo}}</span>
            <span class="booking-date">{{booking.bookingDate | date:'short'}}</span>
          </div>
          <div class="booking-details">
            <p><strong>Name:</strong> {{booking.name}}</p>
            <p><strong>Bus No:</strong> {{booking.busNo}}</p>
            <p><strong>Destination:</strong> {{booking.destination}}</p>
            <p><strong>Time:</strong> {{booking.time}}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .booking-list-container {
      padding: 2rem;
    }

    h2 {
      font-size: 2.4rem;
      margin-bottom: 2rem;
      color: var(--color-dark-1);
    }

    .booking-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }

    .booking-card {
      background-color: var(--color-white-1);
      border-radius: 1.2rem;
      padding: 2rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .booking-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1.5rem;
    }

    .seat-number {
      font-size: 1.8rem;
      font-weight: 600;
      color: var(--color-primary);
    }

    .booking-date {
      color: var(--color-dark-2);
      font-size: 1.4rem;
    }

    .booking-details p {
      margin: 0.8rem 0;
      font-size: 1.4rem;
      color: var(--color-dark-1);
    }
  `]
})
export class BookingListComponent implements OnInit {
  bookings: Booking[] = [];

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.bookings = this.storageService.getAllBookings();
  }
}
