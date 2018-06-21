import { Injectable } from '@angular/core';

import { Card, TYPES } from './card';
import { Player } from './player';

export class State {
  deck: Card[];
  hiddenCard: Card;
  players: Player[];
  playerIdTurn: number;
  messages: string[];

  constructor(playerNum: number) {
    this.generateDeck();
    this.playerIdTurn = 0;
    this.players = [];
    for (let i = 0; i < playerNum; i++) {
      const player = new Player(i, 'Player' + (i + 1));
      player.hand = this.drawCard();
      this.players.push(player);
    }
  }

  drawCard(): Card {
    return this.deck.pop();
  }

  generateDeck() {
    this.deck = [];
    for (let i = 0; i < 5; i++) {
      this.deck.push(new Card(TYPES.GUARD));
      if (i === 0) {
        this.deck.push(new Card(TYPES.KING));
        this.deck.push(new Card(TYPES.COUNTESS));
        this.deck.push(new Card(TYPES.PRINCESS));
      }
      if (i < 2) {
        this.deck.push(new Card(TYPES.PRIEST));
        this.deck.push(new Card(TYPES.BARON));
        this.deck.push(new Card(TYPES.HANDMAID));
        this.deck.push(new Card(TYPES.PRINCE));
      }
    }
    this.deck = this.shuffle(this.deck);
    this.hiddenCard = this.deck.pop();
  }

  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}
