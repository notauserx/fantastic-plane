import { SectionDetail } from "./SectionDetail";
import { SeatingSection } from "./SeatingSection";
import { CreateSeatingSection } from "./Factory/CreateSeatingSection";


export function initializeSeatingSections(sectionDetails: SectionDetail[]): SeatingSection[] {
    return sectionDetails.map((section, i) =>
        CreateSeatingSection(section, i == 0, i == sectionDetails.length - 1));
    }

export function generateSectionDetails(input: number[][]): SectionDetail[] {
    return input.map(section => new SectionDetail(section[1], section[0]));
}