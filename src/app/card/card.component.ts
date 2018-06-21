import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Card } from '../card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() card: Card;
  @Input() hidden = false;
  @Input() size: 'small' | 'normal' | 'large' = 'normal';
  @Output() choose = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
