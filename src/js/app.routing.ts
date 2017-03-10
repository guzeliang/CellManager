import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: '/devices', pathMatch: 'full' },
  { path: 'devices', loadChildren: './device/device.module#DeviceModule' },
  { path: 'customers', loadChildren: './customer/customer.module#CustomerModule' },
  { path: 'consumables', loadChildren: './consumable/consumable.module#ConsumableModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
