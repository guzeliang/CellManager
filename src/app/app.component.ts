import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <header></header>
    <router-outlet></router-outlet>
    <footer></footer>
 `
})
export class AppComponent {
  public hasHeader: boolean = false;
}
