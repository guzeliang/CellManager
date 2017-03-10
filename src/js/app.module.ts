import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing'; 

import {PaginatePipe} from 'ng2-pagination/dist/paginate.pipe';
import {PaginationControlsComponent} from 'ng2-pagination/dist/pagination-controls.component';
import {PaginationControlsDirective} from 'ng2-pagination/dist/pagination-controls.directive';
import {PaginationService} from 'ng2-pagination/dist/pagination.service';

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
