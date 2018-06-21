import { Component, OnInit } from '@angular/core';

import { State } from './state';
import { Player } from './player';

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

    constructor( ) {
      this.initGame();
      this.initPusher();
      this.listenForChanges();
    }

    initGame() {
      this.state = new State(NUM_PLAYERS);
    }

    // initialise Pusher and bind to presence channel
    initPusher() : AppComponent {
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
      this.pusherChannel.bind('pusher:member_added', member => { this.players++ })
      this.pusherChannel.bind('pusher:subscription_succeeded', members => {
        this.players = members.count;
        this.playerId = members.count - 1;
        this.display = 'You are player #' + (this.playerId + 1);
        this.sendState();
      })
      this.pusherChannel.bind('pusher:member_removed', member => { this.players-- });

      return this;
    }

    // Listen for `client-done` events.
    // Update the board object and other properties when
    // event triggered
    listenForChanges() : AppComponent {
      this.pusherChannel.bind('client-done', (obj: State) => {
        this.state = obj;
      });
      return this;
    }

    sendState() : AppComponent {
      this.pusherChannel.trigger('client-done', this.state);
      return this;
    }

    // helper function to get a query param
    getQueryParam(name) {
      var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
      return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }

    // helper function to create a unique presence channel
    // name for each game
    getUniqueId () {
      return 'presence-' + Math.random().toString(36).substr(2, 8);
    }
}
