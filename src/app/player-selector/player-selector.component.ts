import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Player } from '../player';

@Component({
  selector: 'app-player-selector',
  templateUrl: './player-selector.component.html',
  styleUrls: ['./player-selector.component.css']
})
export class PlayerSelectorComponent implements OnInit {

  @Input() players: Player[];
  @Output() select = new EventEmitter<Player>();
  constructor() { }

  ngOnInit() {
  }

  selectPlayer(player: Player) {
    this.select.emit(player);
  }

}
