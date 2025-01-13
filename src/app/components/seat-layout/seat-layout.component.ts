import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Seat } from "../../models/seat.interface";
import { StorageService } from "../../services/storage.service";
import { ToastService } from "../../services/toast.service";
import { Bus } from "../../models/bus.interface";
import { Booking } from "../../models/booking.interface";

@Component({
  selector: 'app-seat-layout',
  templateUrl: './seat-layout.component.html',
  styleUrls: ['./seat-layout.component.css']
})
export class SeatLayoutComponent implements OnInit {
  seats: Seat[][] = [];
  selectedSeat: Seat | null = null;
  showBookingForm = false;
  currentBusId: string = '1';
  currentBus: Bus | null = null;
  isAdminView = false;
  showAdminModal = false;
  selectedBooking: Booking | null = null;

  rows = ['A', 'B', 'C', 'D', 'E'];
  columns = [1, 2, 3];

  constructor(
    private storageService: StorageService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdminView = this.route.snapshot.url[0]?.path === 'admin';

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.currentBusId = params['id'];
        this.currentBus = this.storageService.getBusById(params['id']);
        if (!this.currentBus) {
          this.toastService.show('Invalid bus selected', 'error');
          this.router.navigate([this.isAdminView ? '/admin' : '/select-bus']);
          return;
        }
        this.loadSeats();
      } else {
        this.router.navigate([this.isAdminView ? '/admin' : '/select-bus']);
      }
    });
  }

  loadSeats() {
    if (this.currentBusId && this.currentBus) {
      this.seats = this.storageService.getSeatsByBusId(this.currentBusId);
    } else {
      this.router.navigate(['/select-bus']);
    }
  }

  getSeat(row: string, col: number): Seat {
    const rowIndex = this.rows.indexOf(row);
    const colIndex = this.columns.indexOf(col);
    return this.seats[rowIndex][colIndex];
  }

  isSeatBooked(row: string, col: number): boolean {
    return this.getSeat(row, col).isBooked;
  }

  isSeatSelected(row: string, col: number): boolean {
    return this.selectedSeat?.position === `${row}${col}`;
  }

  onSeatClick(row: string, col: number): void {
    const seat = this.getSeat(row, col);

    if (this.isAdminView) {
      this.showSeatDetails(seat);
      return;
    }

    if (!this.currentBus) {
      this.toastService.show('Bus information not available', 'error');
      return;
    }

    if (seat.isBooked) {
      this.toastService.show('This seat is already booked', 'error');
      return;
    }

    this.selectedSeat = seat;
    this.showBookingForm = true;
  }

  showSeatDetails(seat: Seat) {
    const booking = this.storageService.getBookingsBySeat(seat.number, this.currentBusId);
    if (booking) {
      this.selectedBooking = booking;
      this.showAdminModal = true;
    } else {
      this.toastService.show('Seat is available', 'info');
    }
  }

  closeAdminModal() {
    this.showAdminModal = false;
    this.selectedBooking = null;
  }
}
