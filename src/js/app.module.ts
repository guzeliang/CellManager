import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing'; 

import { NotFoundComponent } from './common/notfound.component';

import {HeaderComponent} from './common/app.header.component';
import {FooterComponent} from './common/app.footer.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,

    AppRoutingModule,
  ],
  declarations: [
    AppComponent, 
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
  ],
  providers: [],
  bootstrap: [AppComponent, HeaderComponent],
})
export class AppModule { }
