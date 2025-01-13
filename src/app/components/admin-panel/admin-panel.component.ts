import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Bus } from '../../models/bus.interface';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  buses: Bus[] = [
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

  constructor(private router: Router) {}

  viewBusDetails(busId: string) {
    this.router.navigate(['/admin/bus', busId]);
  }
}
