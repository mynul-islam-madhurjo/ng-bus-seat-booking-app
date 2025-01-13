import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Booking } from '../../models/booking.interface';

@Component({
  selector: 'app-booking-list',
  template: `
    <div class="booking-list-container">
      <div class="booking-header">
        <h2>Current Bookings</h2>
        <p class="booking-subtitle">View all your bus booking details</p>
      </div>

      <ng-container *ngIf="bookings.length > 0; else noBookings">
        <div class="booking-grid">
          <div class="booking-card" *ngFor="let booking of bookings">
            <div class="booking-header">
              <div class="seat-info">
                <i class="fas fa-chair"></i>
                <span class="seat-number">Seat {{booking.seatNo}}</span>
              </div>
              <span class="booking-date">
                <i class="far fa-calendar-alt"></i>
                {{booking.bookingDate | date:'short'}}
              </span>
            </div>
            <div class="booking-details">
              <div class="detail-row">
                <span class="detail-label">
                  <i class="fas fa-user"></i>
                  Name:
                </span>
                <span class="detail-value">{{booking.name}}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">
                  <i class="fas fa-bus"></i>
                  Bus No:
                </span>
                <span class="detail-value">{{booking.busId}}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">
                  <i class="fas fa-map-marker-alt"></i>
                  Destination:
                </span>
                <span class="detail-value">{{booking.destination}}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">
                  <i class="fas fa-clock"></i>
                  Time:
                </span>
                <span class="detail-value">{{booking.time}}</span>
              </div>
            </div>
          </div>
        </div>
      </ng-container>

      <ng-template #noBookings>
        <div class="no-bookings">
          <div class="no-bookings-icon">
            <i class="fas fa-ticket-alt"></i>
          </div>
          <h3>No Bookings Yet</h3>
          <p>You haven't made any bus bookings yet.</p>
          <button class="book-now-btn" routerLink="/select-bus">
            Book Now
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .booking-list-container {
      padding: 3rem;
      max-width: 120rem;
      margin: 0 auto;
    }

    .booking-header {
      text-align: center;
      margin-bottom: 4rem;
    }

    h2 {
      font-size: 2.8rem;
      color: var(--color-dark-1);
      margin-bottom: 1rem;
    }

    .booking-subtitle {
      font-size: 1.6rem;
      color: var(--color-dark-2);
    }

    .booking-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(35rem, 1fr));
      gap: 2.5rem;
    }

    .booking-card {
      background-color: var(--color-white-1);
      border-radius: 1.2rem;
      padding: 2.5rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .booking-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.12);
    }

    .booking-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--color-white-2);
    }

    .seat-info, .booking-date {
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }

    .seat-info i, .booking-date i {
      color: var(--color-primary);
      font-size: 1.6rem;
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

    .booking-details {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--color-white-2);
    }

    .detail-row:last-child {
      border-bottom: none;
    }

    .detail-label {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      color: var(--color-dark-2);
      font-size: 1.4rem;
    }

    .detail-label i {
      color: var(--color-primary);
      width: 1.6rem;
    }

    .detail-value {
      font-size: 1.5rem;
      color: var(--color-dark-1);
      font-weight: 500;
    }

    .no-bookings {
      text-align: center;
      padding: 6rem 2rem;
      background-color: var(--color-white-1);
      border-radius: 1.2rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    .no-bookings-icon {
      width: 8rem;
      height: 8rem;
      background-color: var(--color-white-2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 2rem;
    }

    .no-bookings-icon i {
      font-size: 3.2rem;
      color: var(--color-primary);
    }

    .no-bookings h3 {
      font-size: 2.4rem;
      color: var(--color-dark-1);
      margin-bottom: 1rem;
    }

    .no-bookings p {
      font-size: 1.6rem;
      color: var(--color-dark-2);
      margin-bottom: 2.5rem;
    }

    .book-now-btn {
      display: inline-flex;
      align-items: center;
      gap: 1rem;
      padding: 1.2rem 2.4rem;
      background-color: var(--color-primary);
      color: var(--color-white-1);
      border: none;
      border-radius: 0.8rem;
      font-size: 1.6rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .book-now-btn:hover {
      background-color: #a62828;
      transform: translateY(-2px);
    }

    @media (max-width: 768px) {
      .booking-list-container {
        padding: 2rem;
      }

      .booking-grid {
        grid-template-columns: 1fr;
      }

      .booking-card {
        padding: 2rem;
      }

      .booking-header {
        flex-direction: column;
        text-align: center;
        gap: 1rem;
      }
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
