export interface Card {
  _id?: string;
  title: string;
  description: string;
}

export interface Column {
  _id?: string;
  title: string;
  cards: Card[];
}

export interface Board {
  _id?: string;
  name: string;
  columns: Column[];
}
