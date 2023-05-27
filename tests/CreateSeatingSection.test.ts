import { SectionDetail } from "../src/SectionDetail";
import { CreateSeatingSection } from "../src/Factory/CreateSeatingSection"
import { LeftSeatingSection, MiddleSeatingSection, RightSeatingSection, SingleSeatingSection } from "../src/SeatingSection";

describe('testing CreateSeatingSeaction', () => {
    test('creats a single seating section when the seating section is the only section', () => {
        const seatingSection = CreateSeatingSection(new SectionDetail(2, 2), true, true);

        expect(seatingSection).toBeInstanceOf(SingleSeatingSection);
    });

    test('creats a left seating section when the seating section is the first from the left', () => {
        const seatingSection = CreateSeatingSection(new SectionDetail(2, 2), true, false);

        expect(seatingSection).toBeInstanceOf(LeftSeatingSection);
    });

    test('creats a right seating section when the seating section is the last from the left', () => {
        const seatingSection = CreateSeatingSection(new SectionDetail(2, 2), false, true);

        expect(seatingSection).toBeInstanceOf(RightSeatingSection);
    });

    test('creats a left seating section when the seating section is the first from the left', () => {
        const seatingSection = CreateSeatingSection(new SectionDetail(2, 2), false, false);

        expect(seatingSection).toBeInstanceOf(MiddleSeatingSection);
    });
});
