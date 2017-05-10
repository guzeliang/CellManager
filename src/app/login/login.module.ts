import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './login.routing';

import { LoginComponent } from './login.component';
import { AccountComponent } from './account.component';
import { LoginService } from './login.service';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        UserRoutingModule
    ],
    exports: [],
    declarations: [
        LoginComponent,
        AccountComponent,
        ],
    providers: [LoginService],
})
export class LoginModule { }
