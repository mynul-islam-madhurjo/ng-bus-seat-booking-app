export interface Seat {
  id: string;
  number: string;
  isBooked: boolean;
  position: string;
  busId?: string;
}
