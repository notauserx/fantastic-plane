import { Seat } from "../Seat";
import { SeatBookingState } from "../SeatBookingState";
import { SeatingRules } from "./SeatingRules";

export const SeatingAlgorithm = {
    getPassengerNumberForSeat: function (seat: Seat, seatBookingState: SeatBookingState): number {
        let passengerNumber = SeatingRules[seat.type].getPassengerNumber(seatBookingState);

        if(passengerNumber > seatBookingState.totalPassengers) return 0;

        seatBookingState.updateBookingState(seat.type);

        return passengerNumber;
    }
}
