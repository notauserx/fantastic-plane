# Airplane Seating

## Workflow

```mermaid

graph TD

A[Create SectionDetails from input]
B[Initialize SeatingSections from SectionDetails]
C[Initialize SeatBookingState to track the booking state]
D[Iterate the seats row by row from left to right]
E[get passenger for seat]
F[aisleSeatsAssigned + 1]
G[totalAisleSeats + windowSeatsAssigned + 1]
H[totalAisleAndWindowSeats + middleSeatsAssigned + 1]

A --> B
B --> C
C --> D
D --> E
E --> |Aisle Seat|F
E --> |Window Seat|G
E --> |Middle Seat|H

```


## Build and run

- Restore the packages

```
npm install
```

- To build and run the project

```
npm run build
npm start
```


- To run the tests

```
npm test
```
