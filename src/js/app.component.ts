import { Component } from '@angular/core';

@Component({
  selector: 'app',
  providers:[],
  template: `
    <header></header>
    <router-outlet></router-outlet>
    <footer></footer>
 `
})
export class AppComponent {
  hasHeader:boolean = false;

  constructor(){
  }

  ngOnInit() {

  }
}
