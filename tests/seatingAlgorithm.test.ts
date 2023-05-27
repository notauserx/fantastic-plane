import { CreateSeat as createSeat} from "../src/Factory/CreateSeat";
import { AisleSeat, MiddleSeat, SeatPosition, WindowSeat } from "../src/Seat";
import { SeatBookingState } from "../src/SeatBookingState";
import { SingleSeatingSection, LeftSeatingSection, RightSeatingSection, MiddleSeatingSection, SeatingSection } from "../src/SeatingSection";
import { SeatingAlgorithm } from "../src/Domain/SeatingAlgorithm";

describe('SeatingAlgorithm', () => {
  describe('test passenger number', () => {
    test('returns 0 when all passengers are assigned', () => {
      const sections: SeatingSection[] = [
        new LeftSeatingSection(2, 2),
        new RightSeatingSection(3, 3)
      ];
      const state = new SeatBookingState(sections, 2);
      state.aisleSeatAssigned = 2;

      const passenger = SeatingAlgorithm.getPassengerNumberForSeat(sections[0].seats[0][0], state);

      expect(passenger).toBe(0);
    });

    
    
  });
  
  describe('test assigning AisleSeats', () => {
    test('seats the first passenger on the leftmost aisle seat of first row', () => {
      
      const sections: SeatingSection[] = [
        new LeftSeatingSection(2, 2),
        new RightSeatingSection(3, 3)
      ];
      const state = new SeatBookingState(sections, 2);

      const passenger = SeatingAlgorithm.getPassengerNumberForSeat(sections[0].seats[0][1], state);
      
      expect(passenger).toBe(1);
    });
  });

  describe('test assigning WindowSeats', () => {
    test('seats the first passenger on the leftmost window seat after aisle seats are assigned', () => {
      
      const sections: SeatingSection[] = [
        new LeftSeatingSection(2, 2),
        new RightSeatingSection(3, 3)
      ];
      const state = new SeatBookingState(sections, 12);

      const passenger = SeatingAlgorithm.getPassengerNumberForSeat(sections[0].seats[0][0], state);
      
      expect(passenger).toBe(5 + 1);
    });
  });

  describe('test assigning MiddleSeats', () => {
  });
  
});