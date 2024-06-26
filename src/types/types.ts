interface Ticket {
  id: string;
  price: number;
  owner: string;
  isReserved: boolean;
}

interface Show {
  showName: string;
  tickets: { [key: string]: Ticket };
  ticketIds: string[];
  minimumRevenue: number;
  owner: string;
  showInfo: string;
  seatArrangement: string;
}

interface ShowDetails {
  showName: string;
  tickets: Ticket[];
  ticketIds: string[];
  minimumRevenue: number;
  owner: string;
  showInfo: string;
  seatArrangement: string;
}

interface UserInputTickets {
  id: string;
  price: number;
}

export type { Show, Ticket, UserInputTickets, ShowDetails };
