import { Component, OnInit, Input, Output } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params }   from '@angular/router';

import {Customer} from './customer';
import {CustomerService} from './customer.service';

var $ = require('jquery');
require('bootstrap');
import * as _ from 'underscore';

@Component({
    selector: 'customers',
    templateUrl: './customers.component.html'
})
export class CustomersComponent implements OnInit {
    params:any = {};
    public models: Customer[];
    public recordCount:number;
    public pageSize:number = 10;
    public pageIndex:number = 1;
    public searchWord:string="";

    public SelectedModel:Customer = new Customer;

    constructor( private http:Http, private service:CustomerService,private route: ActivatedRoute) {
    }
    
    search() {
        this.pageIndex=1;
        var opt = {pagesize:this.pageSize, pageindex:this.pageIndex, keyword:this.searchWord};
        _.extend(opt, this.params);
        this.service.page(opt)
            .then( res => {
                    this.models = res.json().result as Customer[];
                    this.recordCount = res.json().total;
            }).catch(err => console.log(err.message || err))
    }
    
    remove(device:Customer, evt:any) {
        if(!confirm('确定要删除吗')) return;
        this.service.delete(device.id).then(res => {
            var ret = res.json();
            if(ret.code === 'success') {
                this.models = _.reject(this.models, (each) => {
                    return each.id === device.id;
                })
            } else {
              this.popBy(evt.target, ret.message,'');  
            }
            
        }).catch(err => {
            console.log(err.message || err)
            this.popBy('#btnCreate', err.message,'');
        })
    }

    popBy(obj:string, message:string, direct:string) {
        $(obj).popover('destroy');
        $(obj).popover({
            placement: direct ||'bottom',
            trigger: 'manual',
            content: message,
            container: 'body'
        });
    
        clearTimeout($(obj).data('timeout1986'));
        $(obj).popover('show');
        var timeout = setTimeout(function () { $(obj).popover('hide'); }, 3000);
        $(obj).data('timeout1986',timeout);
    }
    
    
    openDialog() {
        this.SelectedModel = new Customer;
        $('#modalCreate').modal('show');
    }
    create(form:NgForm, btn:any) {
        if(form.invalid) {
            return false;
        }
        
        var _this = this;
        this.service.create(this.SelectedModel).then(res => {
            var ret = res.json();
            if(ret.code==='success') {
                _this.pageChange(1);
                //_this.models.unshift(ret.result as Customer);
                btn.click();
            } else {
                _this.popBy('#btnCreate', ret.message,'');
            }
        }).catch(err=> {
            _this.popBy('#btnCreate', err.message,'');
        });
    }
    
    pageChange(pageIndex:number) {
        this.pageIndex = pageIndex;
        this.service.page({pagesize:this.pageSize, pageindex:pageIndex, keyword:this.searchWord})
            .then( res => {
                    this.models = res.json().result as Customer[];
                    this.recordCount = res.json().total;
                })
            .catch(err => console.log(err.message || err))
    }
    
    ngOnInit(): void {
        this.route.params.forEach( (param:Params) => {
            _.extend(this.params, param);
        });
        
        var opt = {pagesize:this.pageSize, pageindex:this.pageIndex};
        _.extend(opt, this.params);

        this.service.page(opt)
            .then( res => {
                    this.models = res.json().result as  Customer[];
            this.recordCount = res.json().total;
                })
            .catch(err => console.log(err.message || err))
        }
}