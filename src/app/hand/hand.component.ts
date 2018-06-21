import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { Card } from '../card';
import { GameService } from '../game.service';
import { Player } from '../player';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.css']
})
export class HandComponent implements OnInit, OnChanges {

  @Input() drawn: Card;
  @Input() player: Player;
  @Output() choose = new EventEmitter<Card>();
  hand: Card;
  cards: Card[] = [];

  constructor(
    private gameService: GameService,
  ) {
    // this.gameService.getPlayer().subscribe((player: Player) => {
    //   this.player = player;
    //   this.hand = player.hand;
    //   this.cards.push(player.hand);
    // });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.player) {
      this.hand = this.player.hand;
    }
  }

  chooseCard(index: number) {
    const chosen = this.cards.splice(index, 1);
    this.choose.emit(chosen[0]);
  }

}
