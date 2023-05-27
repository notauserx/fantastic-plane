import { SeatType } from "../Seat";
import { SeatBookingState } from "../SeatBookingState";

export interface SeatingRule {
    getPassengerNumber(state: SeatBookingState) : number;
}

export const WindowSeatSeatingRule : SeatingRule = {
    getPassengerNumber(state: SeatBookingState) : number {
        return state.totalAisleSeats + state.windowSeatAssigned + 1;
    }
}

export const AisleSeatSeatingRule : SeatingRule = {
    getPassengerNumber(state: SeatBookingState) : number {
        return state.aisleSeatAssigned + 1;
    }
}

export const MiddleSeatSeatingRule : SeatingRule = {
    getPassengerNumber(state: SeatBookingState) : number {
        return state.totalAisleSeats + state.totalWindowSeats + state.middleSeatAssigned + 1;
    }
}

export const SeatingRules = {
    [SeatType.Window]: WindowSeatSeatingRule,
    [SeatType.Aisle]: AisleSeatSeatingRule,
    [SeatType.Middle]: MiddleSeatSeatingRule,
};