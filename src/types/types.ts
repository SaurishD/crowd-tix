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

export type { Show, Ticket };
