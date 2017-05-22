import { Component, OnInit, Input, Output } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router }   from '@angular/router';

import { LoginService } from './login.service';
import md5 from 'blueimp-md5';

// declare var md5:any;

@Component({
    selector: 'account',
    templateUrl: './account.component.html',
    styles: [
        `
        .btn-highlight-1 {background:#cb3837;outline:none; border-radius:20px;
            padding:7px 26px 8px 26px;font-weight:400;font-size:18px;color:#fff;}
        `
    ]
})
export class AccountComponent {
    public name: string  ;
    public password: string ;
    public lisence: string ;
    public address: string ;
    public contact: string ;

    public errMsg: string;

    constructor(private http: Http,
                private service: LoginService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    public create() {
        let model = {
            name: this.name,
            password: md5(this.password),
            address: this.address,
            contact: this.contact,
        };

        this.service.singup(model).then((ret) => {
            if (ret.code === 'success') {
                this.router.navigate(['/']);
            } else {
                this.errMsg = ret.message;
            }
        }).catch((err) => {
            console.log(err.message);
            this.errMsg = err.message;
        });
    }
}
