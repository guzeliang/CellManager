import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule} from '@angular/common';

import { ConsumableRoutingModule } from './consumable.routing';
import {Ng2PaginationModule} from 'ng2-pagination/dist/ng2-pagination'

import { ConsumablesComponent } from './consumables.component';
import {ConsumableService} from './consumable.service'

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        ConsumableRoutingModule,
        Ng2PaginationModule
    ],
    exports: [],
    declarations: [
        ConsumablesComponent, 
        ],
    providers: [ConsumableService],
})
export class ConsumableModule { }
