import { Show } from "@/types/types";

export const showData: Show[] = [
  {
    showName: "Concert",
    tickets: {
      ticket001: {
        id: "ticket001",
        price: 50,
        owner: "0x123456789...",
        isReserved: false,
      },
      ticket002: {
        id: "ticket002",
        price: 50,
        owner: "0x987654321...",
        isReserved: true,
      },
      ticket003: {
        id: "ticket003",
        price: 50,
        owner: "0xabcdef012...",
        isReserved: false,
      },
    },
    ticketIds: ["ticket001", "ticket002", "ticket003"],
    minimumRevenue: 1000,
    owner: "0xabcdef012...",
    showInfo: "Live concert by XYZ band.",
    seatArrangement: "Theater seating",
  },
  {
    showName: "Movie",
    tickets: {
      ticket101: {
        id: "ticket101",
        price: 15,
        owner: "0x098765432...",
        isReserved: false,
      },
      ticket102: {
        id: "ticket102",
        price: 15,
        owner: "0x135792468...",
        isReserved: false,
      },
    },
    ticketIds: ["ticket101", "ticket102"],
    minimumRevenue: 200,
    owner: "0x098765432...",
    showInfo: "Action movie premiere.",
    seatArrangement: "Reserved seating",
  },
];
