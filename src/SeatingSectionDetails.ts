import { AisleSeat, MiddleSeat, Seat, WindowSeat } from "./Seat";

export class SeatingSectionDetails {
    constructor(public windowSeatCount: number = 0, public aisleSeatCount: number = 0, public middleSeatCount: number = 0) { }

    updateDetails(seat: Seat): void {
        if (seat instanceof MiddleSeat)
            this.middleSeatCount++;
        else if (seat instanceof WindowSeat)
            this.windowSeatCount++;
        else if (seat instanceof AisleSeat)
            this.aisleSeatCount++;
    }
}
