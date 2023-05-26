import { createSeat } from "./Factories";

export enum SectionType {
    Left, Middle, Right
}

export enum SeatType {
    Window, Middle, Aisle
}

export class SeatPosition {
    constructor(public row: number, public col: number, public section: SeatingSection) { }
}

export abstract class Seat {
    constructor(protected seatPosition: SeatPosition, private _type: SeatType, public passenger: number = 0) {
    }

    public get type() {
        return this._type;
    }

    public getSeatDetails() : string {
        return `Row: ${this.seatPosition.row}, col: ${this.seatPosition.col}`;
    }
}

export class AisleSeat extends Seat {
    constructor(seatPosition: SeatPosition) {
        super(seatPosition, SeatType.Aisle);
    }
}

export class WindowSeat extends Seat {
    constructor(seatPosition: SeatPosition) {
        super(seatPosition, SeatType.Window);
    }
}

export class MiddleSeat extends Seat {
    constructor(seatPosition: SeatPosition) {
        super(seatPosition, SeatType.Middle);
    }
}

export class SeatingSectionDetails {
    constructor(public windowSeatCount: number = 0, public aisleSeatCount: number = 0, public middleSeatCount: number = 0) { }

    updateDetails(seat: Seat): void {
        if(seat instanceof MiddleSeat) this.middleSeatCount++
        else if(seat instanceof WindowSeat) this.windowSeatCount++
        else if(seat instanceof AisleSeat) this.aisleSeatCount++
    }
}

export abstract class SeatingSection {
    private _seats: Seat[][];
    private _details: SeatingSectionDetails;

    constructor(private type: SectionType, protected _rowCount: number, protected _colCount: number) {
        this._seats = new Array<Seat[]>(this._rowCount);
        this._details = new SeatingSectionDetails();
        this.initializeSeats();
    }

    initializeSeats() : void {
        for(let i = 0; i < this._rowCount; i++) {
            const ithRow: Seat[] = new Array<Seat>(this._colCount);
            for(let j = 0; j < this._colCount; j++) {
                const seat = createSeat(new SeatPosition(i, j, this));
                this._details.updateDetails(seat);
                ithRow[j] = seat;
            }
            this._seats[i] = ithRow;
        }
    }

    public get details() {
        return this._details;
    }

    public get rowCount() {
        return this._rowCount;
    }

    public get colCount() {
        return this._colCount;
    }

    public get seats(): Seat[][] {
        return this._seats;
    }
}

export class LeftSeatingSection extends SeatingSection {

    constructor(rowCount: number, colCount: number) {
        super(SectionType.Left, rowCount, colCount)
    }

}

export class RightSeatingSection extends SeatingSection {
    constructor(rowCount: number, colCount: number) {
        super(SectionType.Right, rowCount, colCount)
    }

}

export class MiddleSeatingSection extends SeatingSection {
    constructor(rowCount: number, colCount: number) {
        super(SectionType.Middle, rowCount, colCount)
    }

}

export class SeatingRow {
    constructor(row: number, seats: Seat[]) { }
}

export class SectionDetail {
    constructor(public rows: number, public columns: number) {

    }
};

export function seatPassengers(sections: SeatingSection[], passengersInQueue: number) {
    const seatBookingState : SeatBookingState = {
        totalPassengers: passengersInQueue,
        totalAisleSeats: 0,
        aisleSeatAssigned: 0,
        totalMiddleSeats: 0,
        middleSeatAssigned: 0,
        totalWindowSeats: 0,
        windowSeatAssigned: 0
    };

    let maxRow = -1;
    for(const section of sections) {
        seatBookingState.totalAisleSeats += section.details.aisleSeatCount;
        seatBookingState.totalWindowSeats += section.details.windowSeatCount;
        seatBookingState.totalMiddleSeats += section.details.middleSeatCount;
        maxRow = Math.max(maxRow, section.rowCount)
    }


    for(let row = 0; row < maxRow; row++) {
        for(const section of sections) {
            if(row >= section.rowCount) continue;
            for(let col = 0; col < section.colCount; col++) {
                const passengerNumber = getPassengerNumberForSeat(
                    section.seats[row][col], 
                    seatBookingState);

                section.seats[row][col].passenger = passengerNumber;
            }
        }
    }
}

export function printSeatPlan(sections: SeatingSection[]) {
    for(const section of sections) {
        for(const seatRow of section.seats) {
            for(const seat of seatRow) {
                console.log(`Passenger ${seat.passenger} on seat ${seat.getSeatDetails()}`);
            }
        }
    }
}

type SeatBookingState = {
    totalPassengers: number;
    totalAisleSeats: number;
    aisleSeatAssigned:number;
    totalWindowSeats:number;
    windowSeatAssigned:number;
    totalMiddleSeats: number;
    middleSeatAssigned: number;

}
function getPassengerNumberForSeat(
    seat: Seat, 
    seatBookingState: SeatBookingState) : number {
        let passengerNumber = 0;
        if(seat.type == SeatType.Aisle) {
            passengerNumber = seatingRules.getAisleSeatPassengerNumber(seatBookingState);
        }
        else if(seat.type == SeatType.Window) {
            passengerNumber = seatingRules.getPassengerNumberForWindowSeat(seatBookingState);
        }
        else if(seat.type == SeatType.Middle) {
            passengerNumber = seatingRules.getMiddleSeatPassengerNumber(seatBookingState);
        }

        return passengerNumber;
    }

const seatingRules = {
    getPassengerNumberForWindowSeat(state: SeatBookingState) {
        const passengerNumber = state.totalAisleSeats + state.windowSeatAssigned + 1
        if(passengerNumber > state.totalPassengers) return 0;
        state.windowSeatAssigned++;
        return passengerNumber;
    },
    getAisleSeatPassengerNumber(state: SeatBookingState) {
        const passengerNumber = state.aisleSeatAssigned + 1;
        if(passengerNumber > state.totalPassengers) return 0;
        state.aisleSeatAssigned++;
        return passengerNumber
    },
    getMiddleSeatPassengerNumber(state: SeatBookingState) {
        const passengerNumber = state.totalAisleSeats + state.totalWindowSeats + state.middleSeatAssigned + 1;
        if(passengerNumber > state.totalPassengers) return 0;
        state.middleSeatAssigned++;
        return passengerNumber;
    }
}
