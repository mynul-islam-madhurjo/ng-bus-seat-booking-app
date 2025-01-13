import {Seat} from "./seat.interface";

export interface Bus {
  id: string;
  busNumber: string;
  seats: Seat[];
}
