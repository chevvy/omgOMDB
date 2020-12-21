import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchBarModule } from './search-bar/search-bar.module';
import { TileComponent } from './movie/tile/tile.component';
import { NominationsComponent } from './nominations/nominations.component';
import { ResultsComponent } from './movie/results/results.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatGridList, MatGridListModule, MatGridTile} from '@angular/material/grid-list';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    TileComponent,
    NominationsComponent,
    ResultsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SearchBarModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
