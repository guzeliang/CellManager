import { Component, OnInit, Input, Output } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params }   from '@angular/router';

import { Consumable } from './consumable';
import { ConsumableService } from './consumable.service';
import * as QRCode from 'qrcode';
import * as _ from 'underscore';
import * as $ from 'jquery';
import 'bootstrap';

@Component({
    selector: 'consumables',
    templateUrl: './consumables.component.html'
})
export class ConsumablesComponent implements OnInit {
    public params: any = {};
    public consumables: Consumable[];
    public recordCount: number;
    public pageSize: number = 10;
    public pageIndex: number = 1;
    public searchWord: string = '';

    public SelectedModel: Consumable = new Consumable();

    constructor(private http: Http,
                private service: ConsumableService,
                private route: ActivatedRoute) {
    }

    public search() {
        this.pageIndex = 1;
        let opt = {pagesize: this.pageSize, pageindex: this.pageIndex, keyword: this.searchWord};
        _.extend(opt, this.params);
        this.service.page(opt)
            .then( (res) => {
                    this.consumables = res.json().result as Consumable[];
                    this.recordCount = res.json().total;
            }).catch((err) => console.log(err.message || err));
    }
    public remove(device: Consumable, evt: any) {
        if (!confirm('确定要删除吗')) {
            return;
        }
        this.service.delete(device.id).then((res) => {
            let ret = res.json();
            if (ret.code === 'success') {
                this.consumables = _.reject(this.consumables, (each) => {
                    return each.id === device.id;
                });
            } else {
              this.popBy(evt.target, ret.message, '');
            }
        }).catch((err) => {
            console.log(err.message || err);
            this.popBy('#btnCreate', err.message, '');
        });
    }

    public popBy(obj: string, message: string, direct: string) {
        $(obj).popover('destroy');
        $(obj).popover({
            placement: direct || 'bottom',
            trigger: 'manual',
            content: message,
            container: 'body'
        });
        clearTimeout($(obj).data('timeout1986'));
        $(obj).popover('show');
        let timeout = setTimeout(() => { $(obj).popover('hide'); }, 3000);
        $(obj).data('timeout1986', timeout);
    }
    public qr(device: Consumable, evt: any) {
        $(evt.target).popover({
            placement: 'bottom',
            trigger: 'manual',
            html: true,
            content: `<div onclick="$(this).parent().parent().remove()" 
            style="width:200px;height:200px;" id="x_device_${device.id}"></div>`,
            container: 'body'
        });
        $(evt.target).popover('show');
        let opts = {
          errorCorrectionLevel: 'H',
          type: 'image/jpeg',
          rendererOpts: {
            quality: 0.7
          }
        };
        let msg = `http://${location.host}/api/iot/qrcode?id=${device.serialNumber}`;

        QRCode.toDataURL(msg, opts,  (err, url) => {
            if (err) {
                return;
            }
            let p = `<img style="width:200px;height:200px;" src='${url}' />`;
            $(`#x_device_${device.id}`).append(p);
        });
    }
    public openDialog() {
        this.SelectedModel = new Consumable();
        $('#modalCreate').modal('show');
    }
    public create(form: NgForm, btn: any) {
        if (form.invalid) {
            return false;
        }
        let _this = this;
        this.service.create(this.SelectedModel).then((res) => {
            let ret = res.json();
            if (ret.code === 'success') {
                _this.pageChange(1);
                btn.click();
            } else {
                _this.popBy('#btnCreate', ret.message, '');
            }
        }).catch((err) => {
            _this.popBy('#btnCreate', err.message, '');
        });
    }
    public pageChange(pageIndex: number) {
        this.pageIndex = pageIndex;
        this.service.page({pagesize: this.pageSize, pageindex: pageIndex, keyword: this.searchWord})
        .then( (res) => {
                this.consumables = res.json().result as Consumable[];
                this.recordCount = res.json().total;
            })
        .catch((err) => console.log(err.message || err));
    }
    public ngOnInit(): void {
        this.route.params.forEach( (param: Params) => {
            _.extend(this.params, param);
        });
        let opt = {pagesize: this.pageSize, pageindex: this.pageIndex};
        _.extend(opt, this.params);

        this.service.page(opt)
        .then( (res) => {
                this.consumables = res.json().result as  Consumable[];
                this.recordCount = res.json().total;
            })
        .catch((err) => console.log(err.message || err));
    }
}
