import { Seat, SeatType } from "./Seat";
import { SeatingSection } from "./SeatingSection";

export class SeatBookingState {
    
    public totalAisleSeats: number = 0;
    public aisleSeatAssigned: number = 0;
    public totalWindowSeats: number = 0;
    public windowSeatAssigned: number = 0;
    public totalMiddleSeats: number = 0;
    public middleSeatAssigned: number = 0;
    public maxRow: number = -1;

    constructor(sections: SeatingSection[], public totalPassengers: number) {
        for (const section of sections) {
            this.totalAisleSeats += section.details.aisleSeatCount;
            this.totalWindowSeats += section.details.windowSeatCount;
            this.totalMiddleSeats += section.details.middleSeatCount;
            this.maxRow = Math.max(this.maxRow, section.rowCount)
        }
    }

    updateBookingState(type: SeatType) {
        this.updaterMap[type]();
    }

    private updaterMap = {
        [SeatType.Aisle]: () => { this.aisleSeatAssigned++},
        [SeatType.Window]: () => { this.windowSeatAssigned++},
        [SeatType.Middle]: () => { this.middleSeatAssigned++},
    }

};
