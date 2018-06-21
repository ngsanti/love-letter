import { Card } from './card';

export class Player {
  name: string;
  hand: Card;
  isEliminated: boolean;

  constructor(name: string) {
    this.name = name;
    this.isEliminated = false;
  }
}
