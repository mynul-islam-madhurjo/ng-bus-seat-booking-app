import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!-- Main Navigation -->
    <app-navbar></app-navbar>

    <!-- Main Content Area -->
    <main class="main-content">
      <div class="container">
        <router-outlet></router-outlet>
      </div>
    </main>
  `,
  styles: [`
    .main-content {
      min-height: calc(100vh - 7rem);
      padding: 3rem 0;
      background-color: var(--color-white-2);
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .main-content {
        min-height: calc(100vh - 10rem); /* Adjusted for mobile nav height */
        padding: 2rem 0;
      }
    }
  `]
})
export class AppComponent {}
