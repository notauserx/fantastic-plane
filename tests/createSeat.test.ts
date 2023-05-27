import { createSeat } from "../src/Factories";
import { AisleSeat, MiddleSeat, SeatPosition, WindowSeat } from "../src/Seat";
import { SingleSeatingSection, LeftSeatingSection, RightSeatingSection, MiddleSeatingSection } from "../src/SeatingSection";

describe('createSeat', () => {
  describe('test creating WindowSeats', () => {
    test('first col of left seating section seat should be a window Seat', () => {
      expect(createSeat(new SeatPosition(1, 0, new LeftSeatingSection(2, 2))))
        .toBeInstanceOf(WindowSeat);
    });

    test('last col of right seating section seat should be a window Seat', () => {
      expect(createSeat(new SeatPosition(1, 1, new RightSeatingSection(2, 2))))
        .toBeInstanceOf(WindowSeat);
    });
    
  });
  
  describe('test creating AisleSeats', () => {
    test('last col of left seating section seat should be a aisle seat', () => {
      expect(createSeat(new SeatPosition(1, 1, new LeftSeatingSection(2, 2))))
        .toBeInstanceOf(AisleSeat);
    });

    test('first col of middle seating section seat should be a aisle seat', () => {
      expect(createSeat(new SeatPosition(1, 0, new MiddleSeatingSection(2, 2))))
        .toBeInstanceOf(AisleSeat);
    });

    test('last col of middle seating section seat should be a aisle seat', () => {
      expect(createSeat(new SeatPosition(1, 1, new MiddleSeatingSection(2, 2))))
        .toBeInstanceOf(AisleSeat);
    });

    test('first col of right seating section seat should be a aisle seat', () => {
      expect(createSeat(new SeatPosition(1, 0, new RightSeatingSection(2, 2))))
        .toBeInstanceOf(AisleSeat);
    });

    test('first col of single seating section seat should not be a aisle seat', () => {
      var seat = createSeat(new SeatPosition(1, 0, new SingleSeatingSection(2, 2)));

      expect(seat instanceof AisleSeat)
        .toBe(false);
    });

    test('first col of left seating section seat should not be a aisle seat', () => {
      var seat = createSeat(new SeatPosition(1, 0, new LeftSeatingSection(2, 2)));

      expect(seat instanceof AisleSeat)
        .toBe(false);
    });

    test('last col of single seating section seat should not be a aisle seat', () => {
      var seat = createSeat(new SeatPosition(1, 1, new SingleSeatingSection(2, 2)));

      expect(seat instanceof AisleSeat)
        .toBe(false);
    });

  });

  describe('test creating MiddleSeats', () => {
    test('middle col of left seating section seat should be a middle Seat', () => {
      expect(createSeat(new SeatPosition(1, 1, new LeftSeatingSection(2, 3))))
        .toBeInstanceOf(MiddleSeat);
    });

    test('middle col of middle seating section seat should be a middle Seat', () => {
      expect(createSeat(new SeatPosition(1, 1, new MiddleSeatingSection(2, 3))))
        .toBeInstanceOf(MiddleSeat);
    });

    test('middle col of right seating section seat should be a middle Seat', () => {
      expect(createSeat(new SeatPosition(1, 1, new RightSeatingSection(2, 3))))
        .toBeInstanceOf(MiddleSeat);
    });

    test('middle col of single seating section seat should be a middle Seat', () => {
      expect(createSeat(new SeatPosition(1, 1, new SingleSeatingSection(2, 3))))
        .toBeInstanceOf(MiddleSeat);
    });
  });
  
});