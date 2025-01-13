import {Component, OnInit} from '@angular/core';
import {Seat} from "../../models/seat.interface";
import {StorageService} from "../../services/storage.service";

@Component({
  selector: 'app-seat-layout',
  templateUrl: './seat-layout.component.html',
  styleUrls: ['./seat-layout.component.css']
})
export class SeatLayoutComponent implements OnInit {
  seats: Seat[][] = [];
  selectedSeat: Seat | null = null;
  showBookingForm = false;

  rows = ['A', 'B', 'C', 'D', 'E'];
  columns = [1, 2, 3];

  constructor(private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.loadSeats();
  }

  loadSeats() {
    this.seats = this.storageService.getAllSeats();
  }

  initializeSeats() {
    this.seats = this.rows.map(row =>
      this.columns.map(col => ({
        id: `${row}${col}`,
        number: `${row}${col}`,
        isBooked: Math.random() < 0.3,
        position: `${row}${col}`
      }))
    );
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

    if (seat.isBooked) {
      alert('This seat is already booked');
      return;
    }

    this.selectedSeat = seat;
    this.showBookingForm = true;
  }
}
