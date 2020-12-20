import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchBarModule } from './search-bar/search-bar.module';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SearchBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
