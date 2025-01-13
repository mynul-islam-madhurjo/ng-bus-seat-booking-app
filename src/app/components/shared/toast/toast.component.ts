import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-toast',
  template: `
    <div class="toast-container">
      <div
        *ngFor="let toast of toastService.getToasts()"
        class="toast"
        [ngClass]="toast.type"
        (click)="toastService.remove(toast.id)"
      >
        {{ toast.message }}
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 2rem;
      right: 2rem;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .toast {
      padding: 1.5rem 2rem;
      border-radius: 0.8rem;
      background-color: var(--color-white-1);
      color: var(--color-dark-1);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      cursor: pointer;
      animation: slideIn 0.3s ease-out;
      min-width: 30rem;
    }

    .success {
      border-left: 4px solid var(--color-green);
    }

    .error {
      border-left: 4px solid var(--color-primary);
    }

    .info {
      border-left: 4px solid #3498db;
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @media (max-width: 768px) {
      .toast-container {
        right: 1rem;
        left: 1rem;
      }

      .toast {
        min-width: auto;
      }
    }
  `]
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}
}
