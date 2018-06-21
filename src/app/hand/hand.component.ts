import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { Card } from '../card';
import { Player } from '../player';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.css']
})
export class HandComponent implements OnInit, OnChanges {

  @Input() drawn: Card;
  @Input() player: Player;
  @Output() choose = new EventEmitter<{chosen: Card, hand: Card}>();
  cards: Card[] = [];

  constructor(
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.player) {
      this.cards.push(this.player.hand);
    } else if (changes.drawn) {
      this.cards.push(this.drawn);
    }
  }

  chooseCard(index: number) {
    const chosen = this.cards.splice(index, 1);
    this.choose.emit({
      chosen: chosen[0],
      hand: this.cards.length > 0 ? this.cards[0] : null,
    });
  }

}
