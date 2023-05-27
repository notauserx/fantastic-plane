import { Seat, SeatType } from "../Seat";
import { SeatBookingState } from "../SeatBookingState";
import { SeatingRules } from "./SeatingRules";


export const SeatingAlgorithm = {
    getPassengerNumberForSeat: function (seat: Seat, seatBookingState: SeatBookingState): number {
        let passengerNumber = 0;

        if (seat.type === SeatType.Aisle) {
            passengerNumber = SeatingRules.getAisleSeatPassengerNumber(seatBookingState);
            seatBookingState.updateBookingStateForAisleSeat(passengerNumber);
        } else if (seat.type === SeatType.Window) {
            passengerNumber = SeatingRules.getPassengerNumberForWindowSeat(seatBookingState);
            seatBookingState.updateBookingStateForWindowSeat(passengerNumber);
        } else if (seat.type === SeatType.Middle) {
            passengerNumber = SeatingRules.getMiddleSeatPassengerNumber(seatBookingState);
            seatBookingState.updateBookingStateForMiddleSeat(passengerNumber);
        }

        return passengerNumber > seatBookingState.totalPassengers
            ? 0 : passengerNumber;
    }
}



