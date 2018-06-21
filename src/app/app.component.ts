import { Component, OnInit } from '@angular/core';

import { Card, TYPES } from './card';
import { Player } from './player';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  player: Player;

  ngOnInit() {
    this.player = new Player('Nathan');
    const card = new Card(TYPES.GUARD);
    this.player.hand = card;
  }
}
