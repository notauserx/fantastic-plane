import { Seat } from "./Seat";
import { SeatingSection } from "./SeatingSection";

export class SeatBookingState {
    ;
    public totalAisleSeats: number = 0;
    public aisleSeatAssigned: number = 0;
    public totalWindowSeats: number = 0;
    public windowSeatAssigned: number = 0;
    public totalMiddleSeats: number = 0;
    public middleSeatAssigned: number = 0;
    ;

    constructor(sections: SeatingSection[], public totalPassengers: number, public maxRow: number = -1) {
        for (const section of sections) {
            this.totalAisleSeats += section.details.aisleSeatCount;
            this.totalWindowSeats += section.details.windowSeatCount;
            this.totalMiddleSeats += section.details.middleSeatCount;
            this.maxRow = Math.max(maxRow, section.rowCount)
        }
    }

    public updateBookingStateForAisleSeat(passengerNumber: number) {
        if (passengerNumber > this.totalPassengers) return;
        this.aisleSeatAssigned++;
    }

    public updateBookingStateForWindowSeat(passengerNumber: number) {
        if (passengerNumber > this.totalPassengers) return;
        this.windowSeatAssigned++;
    }

    public updateBookingStateForMiddleSeat(passengerNumber: number) {
        if (passengerNumber > this.totalPassengers) return;
        this.middleSeatAssigned++;
    }
};
