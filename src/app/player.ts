import { Card } from './card';

export class Player {
  id: number;
  name: string;
  hand: Card;
  isEliminated: boolean;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.isEliminated = false;
  }
}
