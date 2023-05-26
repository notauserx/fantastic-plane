import { createSeat } from "../src/Factories";
import { LeftSeatingSection, SeatPosition, WindowSeat } from "../src/Types";

describe('testing create seat', () => {
    test('first col of left seating section seat should be windowSeat', () => {
      expect(createSeat(new SeatPosition(1, 0, new LeftSeatingSection(2, 2)))).toBeInstanceOf(WindowSeat);
    });
  });