import { Injectable } from '@angular/core';

interface Toast {
  message: string;
  type: 'success' | 'error' | 'info';
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts: Toast[] = [];

  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    const toast: Toast = {
      message,
      type,
      id: Date.now()
    };

    this.toasts.push(toast);
    setTimeout(() => this.remove(toast.id), 3000);
  }

  remove(id: number) {
    this.toasts = this.toasts.filter(t => t.id !== id);
  }

  getToasts() {
    return this.toasts;
  }
}
