import { SeatDefinition } from "../Domain/SeatDefinition";
import { AisleSeat, MiddleSeat, Seat, SeatPosition, WindowSeat } from "../Seat";


export function CreateSeat(position: SeatPosition): Seat {
    if (SeatDefinition.isWindowSeat(position))
        return new WindowSeat(position);

    else if (SeatDefinition.isAisleSeat(position))
        return new AisleSeat(position);


    else
        return new MiddleSeat(position);
}
