import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsumablesComponent } from './consumables.component';

const routes: Routes = [
  { path: '', component: ConsumablesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsumableRoutingModule { }
