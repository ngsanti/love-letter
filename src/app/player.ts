import { TYPES } from './card';

export class Player {
  name: string;
  hand: TYPES;
  isEliminated: boolean;

  constructor(name: string) { 
    this.name = name;
    this.isEliminated = false;
  }
}