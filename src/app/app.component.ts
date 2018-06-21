import { Component, OnInit } from '@angular/core';

import { Card, TYPES } from './card';
import { Player } from './player';
import { State } from './state';

// declare Pusher const for use
declare const Pusher: any;

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

  chosenPlayerId = -1;
  chosenRank = TYPES.GUARD;

  constructor( ) {
    this.initPusher();
    this.listenForChanges();
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
      this.state = new State(members.count);
      this.players = members.count;
      this.playerId = members.count - 1;
      this.display = 'You are player #' + (this.playerId + 1);
      this.pusherChannel.trigger('client-done', this.state);
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

  sendState(): AppComponent {
    this.checkGameOver();
    this.setNextPlayerTurn();
    // reset next player's effect immunity
    this.state.players[this.state.playerIdTurn].isEffectImmune = false;
    this.pusherChannel.trigger('client-done', this.state);
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


  // extra selections
  selectCard(card: Card) {
    console.log('selected' + card.type);
    if (card.type === TYPES.GUARD) {
      // cannot choose guard
      return;
    }
    this.display = "You chose the card " + card.type.toString() + "!";
    this.chosenRank = card.type;

    switch (this.chosenCard.type) {
      case TYPES.GUARD:
        if (this.chosenPlayerId != -1) {
          this.guardEffect();
        }
        break;
      
      default:
        // code...
        break;
    }
  }

  selectPlayer(player: Player) {
    console.log('selected ' + player.name);
    if (player.id === this.playerId) {
      // cannot choose self
      return;
    }
    this.display = "You chose Player#" + player.id + "!";
    this.chosenPlayerId = player.id;

    switch (this.chosenCard.type) {
      case TYPES.GUARD:
        if (this.chosenRank !== TYPES.GUARD) {
          this.guardEffect();
        }
        break;
      
      case TYPES.PRIEST:
        this.priestEffect();
        break;

      case TYPES.BARON:
        this.baronEffect();
        break;

      case TYPES.PRINCE:
        this.princeEffect();
        break;

      case TYPES.KING:
        this.kingEffect();
        break;
      default:
        // code...
        break;
    }
  }

  playCard(cards: {chosen: Card, hand: Card}) {
    this.cardsAtHand--;
    this.chosenCard = cards.chosen;
    this.drawnCard = null;
    this.state.players[this.playerId].hand = cards.hand;

    switch (cards.chosen.type) {
      case TYPES.GUARD:
        if (this.hasAvailableTarget()) {
          this.display = "Select a player and rank";
        } else {
          this.display = "No available targets";
          this.sendState();
        }
        break;
      
      case TYPES.PRIEST:
        if (this.hasAvailableTarget()) {
          this.display = "Select a player to look at their hand";
        } else {
          this.display = "No available targets";
          this.sendState();
        }
        break;

      case TYPES.BARON:
        if (this.hasAvailableTarget()) {
          this.display = "Select a player to compare hands with";
        } else {
          this.display = "No available targets";
          this.sendState();
        }
        break;

      case TYPES.HANDMAID:
        this.handmaidEffect();
        break;

      case TYPES.PRINCE:
        if (this.hasAvailableTarget()) {
          this.display = "Select a player to discard their hand";
        } else {
          this.display = "No available targets";
          this.sendState();
        }
        break;

      case TYPES.KING:
        if (this.hasAvailableTarget()) {
          this.display = "Select a player to trade hands with";
        } else {
          this.display = "No available targets";
          this.sendState();
        }
        break;
      default:
        this.sendState();
        break;
    }
  }


  // Card effects
  guardEffect() {
    // Check if the player has the same guessed type
    if (this.state.players[this.chosenPlayerId].hand.type === this.chosenRank) {
      this.state.players[this.chosenPlayerId].isEliminated = true;
      this.display = "You eliminated Player #" + this.chosenPlayerId + " !";
    } else {
      this.display = "Wrong guess! Try again next time";
    }
    this.sendState();
  }

  priestEffect() {
    this.display = "Player #" + this.chosenPlayerId + "'s card is: " + this.state.players[this.chosenPlayerId].hand.type.toString();
    this.sendState();
  }

  baronEffect() {
    var playerRank = this.state.players[this.playerId].hand.rank;
    var opponentRank = this.state.players[this.chosenPlayerId].hand.rank;
    if (playerRank > opponentRank) {
      this.state.players[this.chosenPlayerId].isEliminated = true;
      this.display = "You were beat Player#" + this.chosenPlayerId + "! who has the " + this.state.players[this.chosenPlayerId].hand.type + " card.";
    } else if (playerRank < opponentRank) {
      this.state.players[this.playerId].isEliminated = true;
      this.display = "You were beaten by Player#" + this.chosenPlayerId + "! With the " + this.state.players[this.chosenPlayerId].hand.type + " card.";
    } else {
      this.display = "You have the same hand with Player#" + this.chosenPlayerId + "!";
    }
    this.sendState();
  }

  handmaidEffect() {
    this.state.players[this.playerId].isEffectImmune = true;
    this.display = "You are now immune to effects until your next turn!";
    this.sendState();
  }

  princeEffect() {
    if (this.state.players[this.chosenPlayerId].hand.type != TYPES.PRINCESS) {
      this.state.players[this.playerId].hand = this.state.deck.pop();
      this.display = "You discarded Player #" + this.chosenPlayerId + "'s card!";
    } else {
      this.state.players[this.playerId].isEliminated = true;
      this.display = "You eliminated Player #" + this.chosenPlayerId + "! They have the Princess!";
    }
    this.sendState();
  }

  kingEffect() {
    var playerType = this.state.players[this.playerId].hand.type;
    var opponentType = this.state.players[this.chosenPlayerId].hand.type;
    this.state.players[this.playerId].hand = new Card(opponentType);
    this.state.players[this.chosenPlayerId].hand = new Card(playerType);
    this.display = "You traded hands with Player#" + this.chosenPlayerId + "!";
    this.sendState();
  }

  // State functions
  hasAvailableTarget(): boolean {
    var hasTarget = false;
    // check if all other players are immune to effects
    for (var i = 0; i < this.state.players.length; i++) {
      if (!this.state.players[i].isEliminated && !this.state.players[i].isEffectImmune) {
        hasTarget = true;
        break;
      }
    }
    return hasTarget;
  }

  checkGameOver() {
    var playersAlive = 0;
    var playerWinnerId = 0;
    for (var i = 0; i < this.state.players.length; i++) {
      if (!this.state.players[i].isEliminated) {
        playersAlive++;
        playerWinnerId = i;
      }
    }
    if (playersAlive < 2) {
      this.display = "Player #" + playerWinnerId + " WINS!";
    }
  }

  setNextPlayerTurn() {
    this.incrementTurn();
    for (var i = 1; i < this.state.players.length; i++) {
      if (this.isPlayerEliminated(this.state.playerIdTurn)) {
        this.incrementTurn();
      }
    }
  }

  incrementTurn() {
    this.state.playerIdTurn = (this.state.playerIdTurn + 1) % this.state.players.length;
  }

  isPlayerEliminated(playerId: number): boolean {
    return this.state.players[playerId].isEliminated;
  }
}
