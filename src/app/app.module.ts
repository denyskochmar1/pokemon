import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToolTipModule } from 'angular2-tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';

import {PokemonApiService} from "./services/pokemon-api.service";
import { API_HTTP_PROVIDERS } from './services/api.service';
import { PopupComponent } from './components/popup/popup.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PopupComponent

  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    ToolTipModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [PokemonApiService, API_HTTP_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
