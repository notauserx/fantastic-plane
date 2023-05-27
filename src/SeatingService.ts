import { Seat, SeatType } from "./Seat";
import { SeatBookingState } from "./SeatBookingState";
import { SeatingSection } from "./SeatingSection";

export function seatPassengers(sections: SeatingSection[], passengersInQueue: number) {
    const seatBookingState = new SeatBookingState(sections, passengersInQueue);

    for(let row = 0; row < seatBookingState.maxRow; row++) {
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
