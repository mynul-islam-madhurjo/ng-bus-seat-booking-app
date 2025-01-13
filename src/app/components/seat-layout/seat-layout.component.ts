import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Seat } from "../../models/seat.interface";
import { StorageService } from "../../services/storage.service";
import { ToastService } from "../../services/toast.service";

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

  rows = ['A', 'B', 'C', 'D', 'E'];
  columns = [1, 2, 3];

  constructor(
    private storageService: StorageService,
    private toastService: ToastService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.currentBusId = params['id'];
        this.loadSeats();
      } else {
        this.loadSeats();
      }
    });
  }

  loadSeats() {
    if (this.currentBusId) {
      this.seats = this.storageService.getSeatsByBusId(this.currentBusId);
    } else {
      this.seats = this.storageService.getAllSeats();
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

    if (seat.isBooked) {
      this.toastService.show('This seat is already booked', 'error');
      return;
    }

    this.selectedSeat = seat;
    this.showBookingForm = true;
  }
}
