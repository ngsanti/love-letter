import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Card } from '../card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() card: Card;
  @Output() choose = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}