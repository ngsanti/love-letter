import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Card } from '../card';

@Component({
  selector: 'app-main-info',
  templateUrl: './main-info.component.html',
  styleUrls: ['./main-info.component.css']
})
export class MainInfoComponent implements OnInit {

  @Output() draw = new EventEmitter<void>();
  @Input() actionCard: Card;
  @Input() cardsLeft: number;
  @Input() hiddenCard: Card;
  @Input() disableDeck = false;
  constructor() { }

  ngOnInit() {
  }

  drawCard() {
    this.draw.emit();
  }

}
