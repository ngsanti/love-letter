import { Component, OnInit } from '@angular/core';

import { Card } from './card';
import { Player } from './player';
import { State } from './state';

// declare Pusher const for use
declare const Pusher: any;
const NUM_PLAYERS = 2;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  display = 'Welcome to love letter!';
  pusherChannel: any;
  gameId: string;
  playerId: number;
  state: State;
  players: number;

  drawnCard: Card;
  cardsAtHand = 1;
  chosenCard: Card;

  constructor( ) {
    this.initGame();
    this.initPusher();
    this.listenForChanges();
  }

  initGame() {
    this.state = new State(NUM_PLAYERS);
  }

  // initialise Pusher and bind to presence channel
  initPusher(): AppComponent {
    // findOrCreate unique channel ID
    let id = this.getQueryParam('id');
    if (!id) {
      id = this.getUniqueId();
      location.search = location.search ? '&id=' + id : 'id=' + id;
    }
    this.gameId = id;

    // init pusher
    const pusher = new Pusher('3b9c78f874e2de26d7af', {
      authEndpoint: '/pusher/auth',
      cluster: 'ap1'
    });

    // bind to relevant Pusher presence channel
    this.pusherChannel = pusher.subscribe(this.gameId);
    this.pusherChannel.bind('pusher:member_added', member => { this.players++; });
    this.pusherChannel.bind('pusher:subscription_succeeded', members => {
      this.players = members.count;
      this.playerId = members.count - 1;
      this.display = 'You are player #' + (this.playerId + 1);
      this.sendState();
    });
    this.pusherChannel.bind('pusher:member_removed', member => { this.players--; });

    return this;
  }

  // Listen for `client-done` events.
  // Update the board object and other properties when
  // event triggered
  listenForChanges(): AppComponent {
    this.pusherChannel.bind('client-done', (obj: State) => {
      this.state = obj;
      console.log(this.state.players[this.playerId].hand);
    });
    return this;
  }

  // helper function to create a unique presence channel
  // name for each game
  getUniqueId () {
    return 'presence-' + Math.random().toString(36).substr(2, 8);
  }

  // helper function to get a query param
  getQueryParam(name) {
    const match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }

  // component interactions?
  drawCard() {
    if (this.cardsAtHand < 2) {
      console.log(this.state);
      console.log(this.state.drawCard);
      this.drawnCard = this.state.deck.pop();
      this.cardsAtHand++;
    }
  }

  selectPlayer(player: Player) {
    console.log('selected ' + player.name);
  }

  sendState(): AppComponent {
    this.pusherChannel.trigger('client-done', this.state);
    return this;
  }

  selectCard(card: Card) {
    console.log('selected' + card.type);
  }

  playCard(cards: {chosen: Card, hand: Card}) {
    this.cardsAtHand--;
    this.chosenCard = cards.chosen;
    this.drawnCard = null;
    this.state.players[this.playerId].hand = cards.hand;
  }
}
