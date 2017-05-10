import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import { AppxRoutingModule } from './appx.routing';
import { Ng2PaginationModule } from 'ng2-pagination/dist/ng2-pagination';
import { AppxComponent } from './appx.component';
import { AppxService } from './appx.service';

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
        AppxComponent
        ],
    providers: [AppxService],
})
export class AppxModule { }
