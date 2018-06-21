import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { Card, TYPES } from '../card';
import { Player } from '../player';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.css']
})
export class HandComponent implements OnInit {

  @Input() drawn: Card;
  @Input() player: Player;
  @Output() choose = new EventEmitter<{chosen: Card, hand: Card}>();

  constructor(
  ) { }

  ngOnInit() {
  }

  chooseHand() {
    this.doChoose(this.player.hand, this.drawn);
  }

  chooseDrawn() {
    this.doChoose(this.drawn, this.player.hand);
  }

  private doChoose(chosen: Card, other: Card) {
    if (this.isValidChoice(chosen, other)) {
      this.choose.emit({
        chosen: chosen,
        hand: other,
      });
    }
  }

  private isValidChoice(chosen: Card, other: Card): boolean {
    if (chosen.type === TYPES.PRINCESS) {
      return false;
    }
    if (other.type === TYPES.COUNTESS && (chosen.type === TYPES.KING || chosen.type === TYPES.PRINCE)) {
      return false;
    }
    return true;
  }

}
