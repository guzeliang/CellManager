import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DeviceRoutingModule } from './device.routing';

import { Ng2PaginationModule } from 'ng2-pagination/dist/ng2-pagination';
import { DevicesComponent } from './devices.component';
import { DeviceService } from './device.service';
import { MyDeviceType } from './pipe';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        DeviceRoutingModule,
        Ng2PaginationModule
    ],
    exports: [],
    declarations: [
        DevicesComponent,
        MyDeviceType
        ],
    providers: [DeviceService],
})
export class DeviceModule { }
