import { SeatDefinition } from "../src/Domain/SeatDefinition";
import { SeatPosition } from "../src/Seat";
import { LeftSeatingSection, RightSeatingSection, SingleSeatingSection } from "../src/SeatingSection";

describe('testing seat definition', () => {
    test('first col of left seating section is a window seat', () => {
      expect(
        SeatDefinition.isLeftWindowSeat(new SeatPosition(0, 0, new LeftSeatingSection(2,2))))
        .toBe(true);
    });

    test('last col of right seating section is a window seat', () => {
        expect(
            SeatDefinition.isRightWindowSeat(new SeatPosition(0, 1, new RightSeatingSection(2,2))))
            .toBe(true);
    });

    test('first col of single seating section is a window seat', () => {
        expect(
          SeatDefinition.isLeftWindowSeat(new SeatPosition(0, 0, new SingleSeatingSection(2,2))))
          .toBe(true);
      });
  
      test('last col of single seating section is a window seat', () => {
          expect(
              SeatDefinition.isRightWindowSeat(new SeatPosition(0, 1, new SingleSeatingSection(2,2))))
              .toBe(true);
      });
  });