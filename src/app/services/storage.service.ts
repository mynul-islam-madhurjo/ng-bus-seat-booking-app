import { Injectable } from '@angular/core';
import { Booking } from '../models/booking.interface';
import { Seat } from '../models/seat.interface';
import { Bus } from '../models/bus.interface';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly BOOKINGS_KEY = 'bus_bookings';
  private readonly SEATS_KEY = 'bus_seats';
  private readonly BUSES_KEY = 'buses';

  constructor(private toastService: ToastService) {
    this.initializeData();
  }

  private initializeData() {
    if (!localStorage.getItem(this.BUSES_KEY)) {
      const buses = [
        {
          id: '1',
          busNumber: 'BUS-5098',
          route: 'Mirpur - Motijheel',
          totalSeats: 15,
          departureTime: '8:00 AM'
        },
        {
          id: '2',
          busNumber: 'BUS-5099',
          route: 'Uttara - Dhanmondi',
          totalSeats: 15,
          departureTime: '9:00 AM'
        },
        {
          id: '3',
          busNumber: 'BUS-5100',
          route: 'Gulshan - Farmgate',
          totalSeats: 15,
          departureTime: '5:00 PM'
        },
        {
          id: '4',
          busNumber: 'BUS-5101',
          route: 'Badda - Mohakhali',
          totalSeats: 15,
          departureTime: '6:00 PM'
        }
      ];
      localStorage.setItem(this.BUSES_KEY, JSON.stringify(buses));
    }

    // Initialize seats for each bus
    this.getAllBuses().forEach(bus => {
      const key = `${this.SEATS_KEY}_${bus.id}`;
      if (!localStorage.getItem(key)) {
        this.initializeSeatsForBus(bus.id);
      }
    });
  }

  private initializeSeatsForBus(busId: string) {
    const rows = ['A', 'B', 'C', 'D', 'E'];
    const columns = [1, 2, 3];

    const seats = rows.map(row =>
      columns.map(col => ({
        id: `${row}${col}`,
        number: `${row}${col}`,
        isBooked: false,
        position: `${row}${col}`,
        busId
      }))
    );

    localStorage.setItem(`${this.SEATS_KEY}_${busId}`, JSON.stringify(seats));
  }

  getAllBuses(): Bus[] {
    const buses = localStorage.getItem(this.BUSES_KEY);
    return buses ? JSON.parse(buses) : [];
  }

  getBusById(id: string): Bus | null {
    return this.getAllBuses().find(bus => bus.id === id) || null;
  }

  getAllBookings(): Booking[] {
    const bookings = localStorage.getItem(this.BOOKINGS_KEY);
    return bookings ? JSON.parse(bookings) : [];
  }

  getBookingsBySeat(seatNo: string, busId: string): Booking | null {
    const bookings = this.getAllBookings();
    return bookings.find(b => b.seatNo === seatNo && b.busId === busId) || null;
  }

  addBooking(booking: Booking): void {
    const bookings = this.getAllBookings();
    bookings.push(booking);
    localStorage.setItem(this.BOOKINGS_KEY, JSON.stringify(bookings));

    this.updateSeatStatus(booking.seatNo, booking.busId, true);
    this.toastService.show('Booking confirmed successfully!', 'success');
  }

  getAllSeats(): Seat[][] {
    const seats = localStorage.getItem(this.SEATS_KEY);
    if (!seats) {
      const initialSeats = this.initializeDefaultSeats();
      localStorage.setItem(this.SEATS_KEY, JSON.stringify(initialSeats));
      return initialSeats;
    }
    return JSON.parse(seats);
  }

  private initializeDefaultSeats(): Seat[][] {
    const rows = ['A', 'B', 'C', 'D', 'E'];
    const columns = [1, 2, 3];

    return rows.map(row =>
      columns.map(col => ({
        id: `${row}${col}`,
        number: `${row}${col}`,
        isBooked: false,
        position: `${row}${col}`,
        busId: '1' // Default bus
      }))
    );
  }

  getSeatsByBusId(busId: string): Seat[][] {
    const key = `${this.SEATS_KEY}_${busId}`;
    const seats = localStorage.getItem(key);
    return seats ? JSON.parse(seats) : [];
  }

  updateSeatStatus(seatNumber: string, busId: string, isBooked: boolean): void {
    const seats = this.getSeatsByBusId(busId);
    const [row, col] = seatNumber.split('');
    const rowIndex = ['A', 'B', 'C', 'D', 'E'].indexOf(row);
    const colIndex = parseInt(col) - 1;

    if (seats[rowIndex] && seats[rowIndex][colIndex]) {
      seats[rowIndex][colIndex].isBooked = isBooked;
      localStorage.setItem(`${this.SEATS_KEY}_${busId}`, JSON.stringify(seats));
    }
  }
}
