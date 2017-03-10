import { Component, OnInit, Input, Output } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params }   from '@angular/router';

import {Consumable} from './consumable';
import {ConsumableService} from './consumable.service';

var $ = require('jquery');
require('bootstrap');

@Component({
    selector: 'consumables',
    templateUrl: './consumables.component.html'
})
export class ConsumablesComponent implements OnInit {
    params:any = {};
    public consumables: Consumable[];
    public recordCount:number;
    public pageSize:number = 10;
    public pageIndex:number = 1;
    public searchWord:string="";

    public SelectedModel:Consumable = new Consumable;

    constructor( private http:Http, private service:ConsumableService,private route: ActivatedRoute) {
    }
    
    search() {
        this.pageIndex=1;
        var opt = {pagesize:this.pageSize, pageindex:this.pageIndex, keyword:this.searchWord};
        _.extend(opt, this.params);
        this.service.page(opt)
            .then( res => {
                    this.consumables = res.json().result as Consumable[];
                    this.recordCount = res.json().total;
            }).catch(err => console.log(err.message || err))
    }
    
    remove(device:Consumable, evt:any) {
        this.service.delete(device.id).then(res => {
            var ret = res.json();
            if(ret.code === 'success') {
                this.consumables = _.reject(this.consumables, (each) => {
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
        this.SelectedModel = new Consumable;
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
                _this.consumables.unshift(ret.result as Consumable);
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
                this.consumables = res.json().result as Consumable[];
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
                this.consumables = res.json().result as  Consumable[];
        this.recordCount = res.json().total;
            })
        .catch(err => console.log(err.message || err))
    }
}