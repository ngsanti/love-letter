export enum TYPES {
  GUARD,
  PRIEST,
  BARON,
  HANDMAID,
  PRINCE,
  KING,
  COUNTESS,
  PRINCESS,
}

export class Card {
  type: TYPES;
  rank: number;
  image: string;
  description: string;
  total: number;

  constructor(type: TYPES) {
    this.type = type;
    switch (type) {
      case TYPES.GUARD:
        this.rank = 1;
        this.image = 'assets/img/guard.png';
        this.description = 'Name a non-guard card.';
        this.total = 5;
        break;
      case TYPES.PRIEST:
        this.rank = 2;
        this.image = 'assets/img/priest.png';
        this.description = 'Look at another player\'s card';
        this.total = 2;
        break;
      case TYPES.BARON:
        this.rank = 3;
        this.image = 'assets/img/baron.png';
        this.description = 'Compare hands.';
        this.total = 2;
        break;
      case TYPES.HANDMAID:
        this.rank = 4;
        this.image = 'assets/img/handmaid.png';
        this.description = 'Until your next turn, ignore all effects from other players.';
        this.total = 2;
        break;
      case TYPES.PRINCE:
        this.rank = 5;
        this.image = 'assets/img/prince.png';
        this.description = 'Choose any player to discard hand.';
        this.total = 2;
        break;
      case TYPES.KING:
        this.rank = 6;
        this.image = 'assets/img/king.png';
        this.description = 'Trade hands with another player.';
        this.total = 1;
        break;
      case TYPES.COUNTESS:
        this.rank = 7;
        this.image = 'assets/img/countess.png';
        this.description = 'Discard if you have Prince or King.';
        this.total = 1;
        break;
      case TYPES.PRINCESS:
        this.rank = 8;
        this.image = 'assets/img/princess.png';
        this.description = 'If you discard this card, you are out of the round.';
        this.total = 1;
        break;
      default:
        this.rank = 0;
        this.image = 'assets/img/back.png';
        this.description = '';
        this.total = 0;
        break;
    }
  }
}
