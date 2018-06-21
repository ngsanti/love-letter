import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { Card } from '../card';
import { Player } from '../player';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.css']
})
export class HandComponent implements OnInit, OnChanges {

  @Input() player: Player;
  @Input() drawn: Card;
  hand: Card;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.player) {
      this.hand = this.player.hand;
    }
  }

  switchHand() {
    const hold = this.drawn;
    this.drawn = this.hand;
    this.hand = hold;
  }

}
