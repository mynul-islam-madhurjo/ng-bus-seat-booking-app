import { Injectable } from '@angular/core';
import { Booking } from '../models/booking.interface';
import { Seat } from '../models/seat.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly BOOKINGS_KEY = 'bus_bookings';
  private readonly SEATS_KEY = 'bus_seats';

  constructor() {
    if (!localStorage.getItem(this.SEATS_KEY)) {
      this.initializeSeats();
    }
  }

  private initializeSeats() {
    const rows = ['A', 'B', 'C', 'D', 'E'];
    const columns = [1, 2, 3];

    const seats = rows.map(row =>
      columns.map(col => ({
        id: `${row}${col}`,
        number: `${row}${col}`,
        isBooked: false,
        position: `${row}${col}`
      }))
    );

    localStorage.setItem(this.SEATS_KEY, JSON.stringify(seats));
  }

  getAllBookings(): Booking[] {
    const bookings = localStorage.getItem(this.BOOKINGS_KEY);
    return bookings ? JSON.parse(bookings) : [];
  }

  addBooking(booking: Booking): void {
    const bookings = this.getAllBookings();
    bookings.push(booking);
    localStorage.setItem(this.BOOKINGS_KEY, JSON.stringify(bookings));

    this.updateSeatStatus(booking.seatNo, true);
  }

  getAllSeats(): Seat[][] {
    const seats = localStorage.getItem(this.SEATS_KEY);
    return seats ? JSON.parse(seats) : [];
  }

  updateSeatStatus(seatNumber: string, isBooked: boolean): void {
    const seats = this.getAllSeats();
    const [row, col] = seatNumber.split('');
    const rowIndex = ['A', 'B', 'C', 'D', 'E'].indexOf(row);
    const colIndex = parseInt(col) - 1;

    if (seats[rowIndex] && seats[rowIndex][colIndex]) {
      seats[rowIndex][colIndex].isBooked = isBooked;
      localStorage.setItem(this.SEATS_KEY, JSON.stringify(seats));
    }
  }
}
