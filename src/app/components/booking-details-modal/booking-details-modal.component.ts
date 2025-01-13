import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Booking } from '../../models/booking.interface';

@Component({
  selector: 'app-booking-details-modal',
  template: `
    <div class="admin-modal-overlay" (click)="onClose.emit()">
      <div class="admin-modal-content" (click)="$event.stopPropagation()">
        <div class="admin-modal-header">
          <h3>Booking Details</h3>
          <button class="admin-close-btn" (click)="onClose.emit()">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="admin-modal-body">
          <div class="admin-booking-details">
            <div class="admin-detail-row">
              <span>Passenger:</span>
              <strong>{{booking.name}}</strong>
            </div>
            <div class="admin-detail-row">
              <span>Seat:</span>
              <strong>{{booking.seatNo}}</strong>
            </div>
            <div class="admin-detail-row">
              <span>Destination:</span>
              <strong>{{booking.destination}}</strong>
            </div>
            <div class="admin-detail-row">
              <span>Time:</span>
              <strong>{{booking.time}}</strong>
            </div>
            <div class="admin-detail-row">
              <span>Booking Date:</span>
              <strong>{{booking.bookingDate | date:'medium'}}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2000;
    }

    .admin-modal-content {
      background-color: var(--color-white-1);
      border-radius: 1.2rem;
      width: 90%;
      max-width: 40rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      animation: modalSlideIn 0.3s ease-out;
    }

    .admin-modal-header {
      padding: 1.5rem 2rem;
      border-bottom: 1px solid var(--color-white-2);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .admin-modal-header h3 {
      font-size: 2rem;
      color: var(--color-dark-1);
      margin: 0;
    }

    .admin-close-btn {
      background: none;
      border: none;
      font-size: 2rem;
      color: var(--color-dark-2);
      cursor: pointer;
      padding: 0.5rem;
      transition: color 0.3s ease;
    }

    .admin-close-btn:hover {
      color: var(--color-primary);
    }

    .admin-modal-body {
      padding: 2rem;
    }

    .admin-booking-details {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .admin-detail-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--color-white-2);
    }

    .admin-detail-row:last-child {
      border-bottom: none;
    }

    .admin-detail-row span {
      color: var(--color-dark-2);
      font-size: 1.4rem;
    }

    .admin-detail-row strong {
      color: var(--color-dark-1);
      font-size: 1.6rem;
    }

    @keyframes modalSlideIn {
      from {
        transform: translateY(-20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `]
})
export class BookingDetailsModalComponent {
  @Input() booking!: Booking;
  @Output() onClose = new EventEmitter<void>();
}
