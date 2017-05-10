import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer.routing';
import { Ng2PaginationModule } from 'ng2-pagination/dist/ng2-pagination';

import { CustomersComponent } from './customers.component';
import { CustomerService } from './customer.service';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        CustomerRoutingModule,
        Ng2PaginationModule,
    ],
    exports: [],
    declarations: [
        CustomersComponent
        ],
    providers: [CustomerService],
})
export class CustomerModule { }
