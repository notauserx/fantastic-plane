import { SeatingAlgorithm } from "./Domain/SeatingAlgorithm";
import { SeatBookingState } from "./SeatBookingState";
import { SeatingSection } from "./SeatingSection";

export function seatPassengers(sections: SeatingSection[], passengersInQueue: number) {
    const seatBookingState = new SeatBookingState(sections, passengersInQueue);

    for (let row = 0; row < seatBookingState.maxRow; row++) {
        for (const section of sections) {
            if (row >= section.rowCount) continue;
            for (let col = 0; col < section.colCount; col++) {
                const passengerNumber = SeatingAlgorithm.getPassengerNumberForSeat(
                    section.seats[row][col],
                    seatBookingState);

                section.seats[row][col].passenger = passengerNumber;
            }
        }
    }
}

export function printSeatPlan(sections: SeatingSection[]) {
    for (const section of sections) {
        for (const seatRow of section.seats) {
            for (const seat of seatRow) {
                console.log(`Passenger ${seat.passenger} on seat ${seat.getSeatDetails()}`);
            }
        }
    }
}
