import { printSeatPlan, seatPassengers } from "./Types";
import { generateSectionDetails, initializeSeatingSections } from "./Utils";

function main() {

    const seatPlans = [
        [3, 2], 
        [4, 3], 
        [2, 3], 
        [3, 4]];
    
    const passengersInQueue = 30;

    const sectionDetails = generateSectionDetails(seatPlans);
    const seatingSections = initializeSeatingSections(sectionDetails);
    // Seat the passengers.
    seatPassengers(seatingSections, passengersInQueue);

    // Print the seat plan.
    printSeatPlan(seatingSections);
  
}

  // Call the main function.
  main();