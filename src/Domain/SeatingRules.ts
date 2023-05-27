import { SeatBookingState } from "../SeatBookingState";

export const SeatingRules = {
    getPassengerNumberForWindowSeat(state: SeatBookingState): number {
        return state.totalAisleSeats + state.windowSeatAssigned + 1;
    },

    getAisleSeatPassengerNumber(state: SeatBookingState): number {
        return state.aisleSeatAssigned + 1;
    },

    getMiddleSeatPassengerNumber(state: SeatBookingState): number {
        return state.totalAisleSeats + state.totalWindowSeats + state.middleSeatAssigned + 1;
    }
};