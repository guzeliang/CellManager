import { Component, OnInit, Input, Output } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params }   from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styles:[
        `
        .btn-highlight-1 {background:#cb3837;outline:none; border-radius:20px;padding:7px 26px 8px 26px;font-weight:400;font-size:18px;color:#fff;}
        `
    ]
    
})
export class LoginComponent {
    private name:string;
    private password:string;

    login() {
        console.log('x')
    }
}