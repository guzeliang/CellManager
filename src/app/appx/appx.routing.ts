import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppxComponent } from './appx.component';

const routes: Routes = [
  { path: '', component: AppxComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppxRoutingModule { }
