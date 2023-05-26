import { createSeat } from "../src/Factories";
import { AisleSeat, LeftSeatingSection, MiddleSeat, SeatPosition, WindowSeat } from "../src/Types";

describe('testing create seat', () => {
    test('first col of left seating section seat should be a window Seat', () => {
      expect(createSeat(new SeatPosition(1, 0, new LeftSeatingSection(2, 2)))).toBeInstanceOf(WindowSeat);
    });

    test('last col of left seating section seat should be a aisle seat', () => {
      expect(createSeat(new SeatPosition(1, 1, new LeftSeatingSection(2, 2)))).toBeInstanceOf(AisleSeat);
    });

    test('middle col of left seating section seat should be windowSeat', () => {
      expect(createSeat(new SeatPosition(1, 1, new LeftSeatingSection(2, 3)))).toBeInstanceOf(MiddleSeat);
    });
  });