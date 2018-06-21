import { Component, OnInit } from '@angular/core';

import { GameService } from './game.service';

// declare Pusher const for use
declare const Pusher: any;
const NUM_PLAYERS = 2;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GameService]
})
export class AppComponent {
      testDisplay: string = "test";
      pusherChannel: any;
      gameId: string;
      player: number = 0;
      players: number = 0;
      canPlay: boolean = false;

      constructor(
        private gameService: GameService,
      ) {
        this.initPusher();
        this.listenForChanges();
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
          this.setPlayer(this.players);
        })
        this.pusherChannel.bind('pusher:member_removed', member => { this.players-- });

        return this;
      }

      // Listen for `client-fire` events.
      // Update the board object and other properties when 
      // event triggered
      listenForChanges() : AppComponent {
        this.pusherChannel.bind('client-done', (obj) => {
          this.canPlay = !this.canPlay;
          // swap turn
        });
        return this;
      }

      // initialise player and set turn
      setPlayer(players:number = 0) : AppComponent {
        this.player = players - 1;
        if (players == 1) {
          this.canPlay = true;
        } else if (players == 2) {
          this.canPlay = false;
        }
        return this;
      }

      endTurn() : AppComponent {
        this.canPlay = false;
        this.pusherChannel.trigger('client-done', {
          // player: this.player,
          // score: this.boards[this.player].player.score,
          // boardId: boardId,
          // board: this.boards[boardId]
        });
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

      // check if player is a valid player for the game
      get validPlayer(): boolean {
        return (this.players >= NUM_PLAYERS) && (this.player < NUM_PLAYERS);
      }
}
