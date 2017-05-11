import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <header></header>
    <router-outlet></router-outlet>
    <footer></footer>
 `
})
export class AppComponent implements OnInit  {
  public hasHeader: boolean = false;
  public ngOnInit(): void {
      console.log('init');
  }
}
