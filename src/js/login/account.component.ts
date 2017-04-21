import { Component, OnInit, Input, Output } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router }   from '@angular/router';
var md5 = require('blueimp-md5');

import {LoginService} from './login.service';


@Component({
    selector: 'account',
    templateUrl: './account.component.html',
    styles:[
        `
        .btn-highlight-1 {background:#cb3837;outline:none; border-radius:20px;padding:7px 26px 8px 26px;font-weight:400;font-size:18px;color:#fff;}
        `
    ]
})
export class AccountComponent {
    private name:string  ;
    private password:string ;
    private lisence:string ;
    private address:string ;
    private contact:string ;

    private errMsg:string;

    constructor( private http:Http, private service:LoginService,private route: ActivatedRoute,private router: Router) {
    }
    create() {
        var model = {
            name:this.name,
            password:md5(this.password),
            address:this.address,
            contact:this.contact,
        }
        this.service.singup(model).then(res => {
            var ret = res.json();
            if(ret.code =='success') {
                this.router.navigate(['/']);
            } else {
                this.errMsg = ret.message;
            }
        }).catch(err=> {
            console.log(err.message);
            this.errMsg = err.message;
        });
    }
}