import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Seat } from '../../models/seat.interface';
import {StorageService} from "../../services/storage.service";

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent {
  @Input() selectedSeat!: Seat;
  @Output() bookingComplete = new EventEmitter<void>();

  bookingForm: FormGroup;
  destinations = ['Mirpur 11', 'Dhanmondi', 'Uttara', 'Motijheel'];
  timeSlots = ['8:00 AM', '9:00 AM', '5:00 PM', '6:00 PM'];

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService
  ) {
    this.bookingForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      busNo: ['5098', Validators.required],
      seatNo: ['', Validators.required],
      destination: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.selectedSeat) {
      this.bookingForm.patchValue({
        seatNo: this.selectedSeat.number
      });
    }
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      const booking = {
        id: Date.now().toString(),
        ...this.bookingForm.value,
        bookingDate: new Date().toISOString()
      };

      this.storageService.addBooking(booking);
      this.showConfirmation();
      this.bookingComplete.emit();
    }
  }

  showConfirmation() {
    alert('Booking confirmed successfully!');
  }
}
