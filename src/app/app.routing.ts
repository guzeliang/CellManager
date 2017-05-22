import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthGuard } from './common/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/devices', pathMatch: 'full' },
  { path: 'devices', loadChildren: './device/device.module#DeviceModule', canActivate: [AuthGuard]},
  { path: 'customers',
    loadChildren: './customer/customer.module#CustomerModule',
    canActivate: [ AuthGuard ] },
  { path: 'consumables',
    loadChildren: './consumable/consumable.module#ConsumableModule',
    canActivate: [ AuthGuard ] },
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  { path: 'appx', loadChildren: './appx/appx.module#AppxModule', canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
