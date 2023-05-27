import { SeatBookingState } from "../src/SeatBookingState";
import { AisleSeatSeatingRule, MiddleSeatSeatingRule, SeatingRules, WindowSeatSeatingRule } from "../src/Domain/SeatingRules";
import { SeatType } from "../src/Seat";
import { LeftSeatingSection, RightSeatingSection, SeatingSection } from "../src/SeatingSection";

describe('SeatingRules', () => {

  describe('test seating rule mappings', () => {
    test('window seat calls window seating rule', () => {
      
      expect(SeatingRules[SeatType.Window])
        .toBe(WindowSeatSeatingRule);
    });

    test('aisle seat calls aisle seating rule', () => {
      expect(SeatingRules[SeatType.Aisle])
        .toBe(AisleSeatSeatingRule);
    });

    test('middle seat calls aisle seating rule', () => {
      expect(SeatingRules[SeatType.Middle])
        .toBe(MiddleSeatSeatingRule);
    });
    
    
  });

  describe('test middle seat rules', () => {
    test('first aisle seat starts at one', () => {
      const sections: SeatingSection[] = [
        new LeftSeatingSection(2, 2),
        new RightSeatingSection(3, 3)
      ];
      const state = new SeatBookingState(sections, 7);

      const passenger =  AisleSeatSeatingRule.getPassengerNumber(state);

      expect(passenger).toBe(1);
    });

    test('consequetive aisle seat starts at aisle seats assigned plus one', () => {
      const sections: SeatingSection[] = [
        new LeftSeatingSection(2, 2),
        new RightSeatingSection(3, 3)
      ];
      const state = new SeatBookingState(sections, 7);

      state.aisleSeatAssigned = 3
      const passenger =  AisleSeatSeatingRule.getPassengerNumber(state);

      expect(passenger).toBe(3 + 1);
    });
  });
  
  describe('test window seat rules', () => {
    test('first window seat starts after total aisle seats', () => {
      const sections: SeatingSection[] = [
        new LeftSeatingSection(2, 2),
        new RightSeatingSection(3, 3)
      ];
      const state = new SeatBookingState(sections, 7);

      const windowPassenger =  WindowSeatSeatingRule.getPassengerNumber(state);
      expect(windowPassenger)
        .toBe(6);
    });

    test('consequent window seat starts after total aisle seats plus number of window seats assigned', () => {
      const sections: SeatingSection[] = [
        new LeftSeatingSection(2, 2),
        new RightSeatingSection(3, 3)
      ];
      const state = new SeatBookingState(sections, 7);

      state.windowSeatAssigned++;
      const windowPassenger =  WindowSeatSeatingRule.getPassengerNumber(state);
      expect(windowPassenger)
        .toBe(7);
    });

    

  });

  describe('test middle seat rules', () => {
    test('first middle seat starts after all aisle and window seats are assigned', () => {
      const sections: SeatingSection[] = [
        new LeftSeatingSection(2, 2),
        new RightSeatingSection(3, 3)
      ];
      const state = new SeatBookingState(sections, 12);

      const passenger =  MiddleSeatSeatingRule.getPassengerNumber(state);
      expect(passenger)
        .toBe(5 + 5 + 1);
    });
  });
  
  test('consequetive middle seat starts after all aisle and window seats are assigned plus middle seats assigned', () => {
    const sections: SeatingSection[] = [
      new LeftSeatingSection(2, 2),
      new RightSeatingSection(3, 3)
    ];
    const state = new SeatBookingState(sections, 12);

    state.middleSeatAssigned++
    const passenger =  MiddleSeatSeatingRule.getPassengerNumber(state);
    expect(passenger)
      .toBe(5 + 5 + + 1 + 1);
  });
});
