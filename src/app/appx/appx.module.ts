import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule} from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';

import { AppxRoutingModule } from './appx.routing';

// import {PaginatePipe} from 'ng2-pagination/dist/paginate.pipe';
// import {PaginationControlsComponent} from 'ng2-pagination/dist/pagination-controls.component';
// import {PaginationControlsDirective} from 'ng2-pagination/dist/pagination-controls.directive';
// import {PaginationService} from 'ng2-pagination/dist/pagination.service';

import {Ng2PaginationModule} from 'ng2-pagination/dist/ng2-pagination'

import { AppxComponent } from './appx.component';

import {AppxService} from './appx.service'

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        FileUploadModule,
        AppxRoutingModule,
        Ng2PaginationModule
        
    ],
    exports: [],
    declarations: [
        AppxComponent, 
        ],
    providers: [AppxService],
})
export class AppxModule { }
