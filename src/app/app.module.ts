import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CardSelectorComponent } from './card-selector/card-selector.component';
import { CardComponent } from './card/card.component';
import { GuideTextComponent } from './guide-text/guide-text.component';
import { HandComponent } from './hand/hand.component';
import { MainInfoComponent } from './main-info/main-info.component';
import { PlayerSelectorComponent } from './player-selector/player-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    GuideTextComponent,
    MainInfoComponent,
    CardComponent,
    HandComponent,
    CardSelectorComponent,
    PlayerSelectorComponent,
  ],
  imports: [
    BrowserModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
