import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { Card } from '../card';
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
    this.choose.emit({
      chosen: this.player.hand,
      hand: this.drawn,
    });
  }

  chooseDrawn() {
    this.choose.emit({
      chosen: this.drawn,
      hand: this.player.hand,
    });
  }

}
