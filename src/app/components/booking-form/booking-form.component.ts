import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Seat } from '../../models/seat.interface';
import { StorageService } from "../../services/storage.service";
import { ToastService } from "../../services/toast.service";
import { Bus } from "../../models/bus.interface";

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {
  @Input() selectedSeat!: Seat;
  @Input() currentBus!: Bus;
  @Output() bookingComplete = new EventEmitter<void>();

  bookingForm: FormGroup;
  destinations: string[] = [];

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private toastService: ToastService
  ) {
    this.bookingForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      busNumber: [{value: '', disabled: true}],
      seatNo: [{value: '', disabled: true}],
      destination: ['', Validators.required],
      time: [{value: '', disabled: true}]
    });
  }

  ngOnInit() {
    if (this.selectedSeat && this.currentBus) {
      this.bookingForm.patchValue({
        busNumber: this.currentBus.busNumber,
        seatNo: this.selectedSeat.number,
        time: this.currentBus.departureTime
      });

      const [origin, destination] = this.currentBus.route.split(' - ');
      this.destinations = [destination];
    }
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      const formValue = this.bookingForm.getRawValue();
      const booking = {
        id: Date.now().toString(),
        name: formValue.name,
        busId: this.currentBus.id,
        busNumber: formValue.busNumber,
        seatNo: formValue.seatNo,
        destination: formValue.destination,
        time: formValue.time,
        bookingDate: new Date().toISOString()
      };

      this.storageService.addBooking(booking);
      this.bookingComplete.emit();
    }
  }
}
