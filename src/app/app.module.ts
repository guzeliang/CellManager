import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { AuthGuard } from './common/auth.guard';
import { CookieModule } from 'ngx-cookie';

import { NotFoundComponent } from './common/notfound.component';

import { HeaderComponent } from './common/app.header.component';
import { FooterComponent } from './common/app.footer.component';
import { HelloComponent } from './common/hello.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
     CookieModule.forRoot(),
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HelloComponent,
    NotFoundComponent,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent, HeaderComponent],
})
export class AppModule { }
