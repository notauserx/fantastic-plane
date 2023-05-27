import { LeftSeatingSection, MiddleSeatingSection, RightSeatingSection, SeatingSection, SingleSeatingSection } from "../SeatingSection";
import { SectionDetail } from "../SectionDetail";


export function CreateSeatingSection(sectionDetail: SectionDetail, isFirst: boolean, isLast: boolean): SeatingSection {
    if (isFirst && isLast)
        return new SingleSeatingSection(sectionDetail.rows, sectionDetail.columns);

    if (isFirst)
        return new LeftSeatingSection(sectionDetail.rows, sectionDetail.columns);

    if (isLast)
        return new RightSeatingSection(sectionDetail.rows, sectionDetail.columns);

    return new MiddleSeatingSection(sectionDetail.rows, sectionDetail.columns);
}
