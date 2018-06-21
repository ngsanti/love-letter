export enum TYPES {
	GUARD,
	PRIEST,
	BARON,
	HANDMAID,
	PRINCE,
	KING,
	COUNTESS,
	PRINCESS
}

export class Card {
  type: TYPES;
  rank: number;
  image: string;
  description: string;

  constructor(type: TYPES) { 
  	this.type = type;
  	switch (type) {
  		case TYPES.GUARD:
  			this.rank = 1;
  			this.image = "";
  			this.description = "";
  			break;
  		
  		default:
  			// code...
  			break;
  	}
  }
}