import { Component, Input, OnInit } from '@angular/core';

import { GameService } from '../game.service';

@Component({
  selector: 'app-guide-text',
  templateUrl: './guide-text.component.html',
  styleUrls: ['./guide-text.component.css']
})
export class GuideTextComponent implements OnInit {
  constructor() { }

  @Input() display = '';
  ngOnInit() {
  }
}
