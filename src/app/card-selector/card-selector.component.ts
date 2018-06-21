import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Card, TYPES } from '../card';

@Component({
  selector: 'app-card-selector',
  templateUrl: './card-selector.component.html',
  styleUrls: ['./card-selector.component.css']
})
export class CardSelectorComponent implements OnInit {

  @Output() select = new EventEmitter<Card>();
  cards: Card[] = [];

  constructor() { }

  ngOnInit() {
    for (const type in TYPES) {
      if (!isNaN(Number(type))) {
        this.cards.push(new Card(Number(type)));
      }
    }
  }

  doSelect(card: Card) {
    this.select.emit(card);
  }

}
