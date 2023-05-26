import { Seat, SectionDetail, SeatingSection, LeftSeatingSection, MiddleSeatingSection, RightSeatingSection, WindowSeat, SeatPosition, AisleSeat, MiddleSeat } from "./Types";

export function createSeatingSection(sectionDetail: SectionDetail, isFirst: boolean, isLast: boolean): SeatingSection {
    if (isFirst)
        return new LeftSeatingSection(sectionDetail.rows, sectionDetail.columns);

    if (isLast)
        return new RightSeatingSection(sectionDetail.rows, sectionDetail.columns);

    return new MiddleSeatingSection(sectionDetail.rows, sectionDetail.columns);
}

export function createSeat(position: SeatPosition): Seat {
    if(seatDefinition.isLeftWindowSeat(position) || seatDefinition.isRightWindowSeat(position)) 
        return new WindowSeat(position);

    else if(seatDefinition.isAisleSeat(position)) 
        return new AisleSeat(position);

    else 
        return new MiddleSeat(position);
}

const seatDefinition = {
    isLeftWindowSeat: (position: SeatPosition) => 
        (position.section instanceof LeftSeatingSection && position.col == 0),

    isRightWindowSeat: (position: SeatPosition) => 
        (position.section instanceof RightSeatingSection && position.col + 1 == position.section.colCount),
    
    isAisleSeat: (position: SeatPosition) => 
        (position.section instanceof LeftSeatingSection && position.col + 1 == position.section.colCount) ||
        (position.section instanceof MiddleSeatingSection && position.col == 0) ||
        (position.section instanceof MiddleSeatingSection && position.col != 0 && position.col + 1 == position.section.colCount) ||
        (position.section instanceof RightSeatingSection && position.col == 0)
}