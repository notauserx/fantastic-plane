import { SeatingSection } from "./SeatingSection";

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

    public getSeatDetails(): string {
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