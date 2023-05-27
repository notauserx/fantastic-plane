import { CreateSeat } from "./Factory/CreateSeat";
import { Seat, SeatPosition } from "./Seat";
import { SeatingSectionDetails } from "./SeatingSectionDetails";

export enum SectionType {
    Left, Middle, Right, Single
}

export abstract class SeatingSection {
    private _seats: Seat[][];
    private _details: SeatingSectionDetails;

    constructor(private type: SectionType, protected _rowCount: number, protected _colCount: number) {
        this._seats = new Array<Seat[]>(this._rowCount);
        this._details = new SeatingSectionDetails();
        this.initializeSeats();
    }

    initializeSeats(): void {
        for (let i = 0; i < this._rowCount; i++) {
            const ithRow: Seat[] = new Array<Seat>(this._colCount);
            for (let j = 0; j < this._colCount; j++) {
                const seat = CreateSeat(new SeatPosition(i, j, this));
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


export class SingleSeatingSection extends SeatingSection {
    constructor(rowCount: number, colCount: number) {
        super(SectionType.Single, rowCount, colCount)
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