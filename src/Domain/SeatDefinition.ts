import { SeatPosition } from "../Seat";
import { LeftSeatingSection, SingleSeatingSection, RightSeatingSection, MiddleSeatingSection } from "../SeatingSection";

export const SeatDefinition = {
    isWindowSeat: (position: SeatPosition) => {
        return SeatDefinition.isLeftWindowSeat(position) ||
            SeatDefinition.isRightWindowSeat(position);
    },

    // the seats in the first column in left or single seating section are window seats
    isLeftWindowSeat: (position: SeatPosition) => {
        if (position.section instanceof LeftSeatingSection || position.section instanceof SingleSeatingSection) {
            return position.col === 0;
        }
        return false;
    },

    isRightWindowSeat: (position: SeatPosition) => {
        // the seats in the last column of Right or single seating section are window seats
        if (position.section instanceof RightSeatingSection || position.section instanceof SingleSeatingSection) {
            return position.col + 1 === position.section.colCount;
        }
        return false;
    },

    isAisleSeat: (position: SeatPosition) => {
        // no aisle seats if the plane has only one seating section
        if (position.section instanceof SingleSeatingSection) return false;

        // the seats in the last column of left seating section are aisle seats
        if (position.section instanceof LeftSeatingSection) {
            return position.col + 1 === position.section.colCount;
        }

        // the seats in the first and last column of middle seating sections are aisle seats
        if (position.section instanceof MiddleSeatingSection) {
            return position.col === 0 || (position.col + 1 === position.section.colCount);
        }

        // the seats in the first columns of the right seating section are aisle seats
        if (position.section instanceof RightSeatingSection) {
            return position.col === 0;
        }

        return false;
    }
};
