import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GuideTextComponent } from './guide-text/guide-text.component';
import { MainInfoComponent } from './main-info/main-info.component';

@NgModule({
  declarations: [
    AppComponent,
    GuideTextComponent,
    MainInfoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
