// Onsen UI Styling and Icons
require('onsenui/stylus/blue-basic-theme.styl');
require('onsenui/css/onsenui.css');

// Application code starts here
import {enableProdMode, NgModule, CUSTOM_ELEMENTS_SCHEMA, Component} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {OnsenModule, OnsNavigator, Params} from 'angular2-onsenui';

import {PokedexService} from './app/pokedex.service';
import {CapitalizePipe} from './app/capitalize.pipe';

import {MyApp} from './app/app';
import {MasterPage} from './app/master';
import {DetailPage} from './app/detail';

// Enable production mode when in production mode.
if (process.env.NODE_ENV === 'production') {
  enableProdMode();
}

@NgModule({
  imports: [
    OnsenModule,
    HttpModule,
    BrowserModule
  ],
  declarations: [
    MyApp,
    MasterPage,
    DetailPage,
    CapitalizePipe
  ],
  entryComponents: [
    MasterPage,
    DetailPage
  ],
  providers: [PokedexService],
  bootstrap: [MyApp],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
