import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bus } from '../../models/bus.interface';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-bus-selection',
  template: `
    <div class="bus-selection-container">
      <div class="bus-selection-header">
        <h2>Select Bus</h2>
        <p>Choose a bus to book your seat</p>
      </div>

      <div class="bus-grid">
        <div class="bus-card" *ngFor="let bus of buses" (click)="selectBus(bus)">
          <div class="bus-number">{{bus.busNumber}}</div>
          <div class="bus-info">
            <p class="route">{{bus.route}}</p>
            <p class="time">Departure: {{bus.departureTime}}</p>
            <p class="seats">Total Seats: {{bus.totalSeats}}</p>
          </div>
          <button class="btn-select">Select Bus</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .bus-selection-container {
      padding: 3rem;
      max-width: 120rem;
      margin: 0 auto;
    }

    .bus-selection-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .bus-selection-header h2 {
      font-size: 2.8rem;
      color: var(--color-dark-1);
      margin-bottom: 1rem;
    }

    .bus-selection-header p {
      font-size: 1.6rem;
      color: var(--color-dark-2);
    }

    .bus-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr));
      gap: 2rem;
    }

    .bus-card {
      background-color: var(--color-white-1);
      border-radius: 1.2rem;
      padding: 2rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
      cursor: pointer;
    }

    .bus-card:hover {
      transform: translateY(-4px);
    }

    .bus-number {
      font-size: 2.4rem;
      font-weight: 700;
      color: var(--color-primary);
      margin-bottom: 1.5rem;
    }

    .bus-info {
      margin-bottom: 2rem;
    }

    .bus-info p {
      margin: 0.8rem 0;
      font-size: 1.4rem;
      color: var(--color-dark-2);
    }

    .route {
      font-weight: 600;
      color: var(--color-dark-1) !important;
    }

    .btn-select {
      width: 100%;
      padding: 1.2rem;
      background-color: var(--color-primary);
      color: var(--color-white-1);
      border: none;
      border-radius: 0.8rem;
      font-size: 1.4rem;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .btn-select:hover {
      background-color: #a62828;
    }
  `]
})
export class BusSelectionComponent implements OnInit {
  buses: Bus[] = [];

  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.buses = this.storageService.getAllBuses();
  }

  selectBus(bus: Bus) {
    this.router.navigate(['/booking', bus.id]);
  }
}
