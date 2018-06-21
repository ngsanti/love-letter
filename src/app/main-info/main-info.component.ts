import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Card } from '../card';
import { GameService } from '../game.service';

@Component({
  selector: 'app-main-info',
  templateUrl: './main-info.component.html',
  styleUrls: ['./main-info.component.css']
})
export class MainInfoComponent implements OnInit {

  @Output() draw = new EventEmitter<void>();
  @Input() actionCard: Card;
  @Input() cardsLeft: number;
  constructor(public gameService: GameService) { }

  ngOnInit() {
  }

  drawCard() {
    this.draw.emit();
  }

}
