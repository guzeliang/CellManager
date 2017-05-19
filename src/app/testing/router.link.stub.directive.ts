export { ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';

import { Component, Directive, Injectable, Input, HostListener } from '@angular/core';
import { NavigationExtras } from '@angular/router';

@Directive({
  selector: '[routerLink]',
})
export class RouterLinkStubDirective {
  // tslint:disable-next-line:no-input-rename
  @Input('routerLink') public linkParams: string;
  public navigatedTo: any = null;

  @HostListener('click', ['$event.target'])
  public onClick() {
    this.navigatedTo = this.linkParams;
  }
}
