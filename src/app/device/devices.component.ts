import { Component, OnInit, Input, Output } from '@angular/core';
import { Headers, Response } from '@angular/http';
import { ActivatedRoute, Params }   from '@angular/router';
import { NgForm } from '@angular/forms';

import { Device } from './device';
import { DeviceService } from './device.service';

import * as _ from 'underscore';
import * as $ from 'jquery';
import 'bootstrap';

@Component({
    selector: 'devices',
    templateUrl: './devices.component.html'
})
export class DevicesComponent implements OnInit {
    public params: any = {};
    public devices: Device[];
    public recordCount: number;
    public pageSize: number = 10;
    public pageIndex: number = 1;
    public searchWord: string = '';

    public SelectedDevice: Device = new Device();

    constructor(private service: DeviceService,
                private route: ActivatedRoute) {
    }
    public search() {
        this.pageIndex = 1;
        let opt = {pagesize: this.pageSize, pageindex: this.pageIndex, keyword: this.searchWord};
        _.extend(opt, this.params);
        this.service.page(opt)
            .then( (res) => {
                    this.devices = res.result as Device[];
                    this.recordCount = res.total;
            }).catch((err) => console.log(err.message || err));
    }
    public remove(device: Device, evt: any) {
        if (!confirm('确定要删除吗')) {
            return;
        }

        this.service.delete(device.id).then((ret) => {
            if (ret.code === 'success') {
                this.devices = _.reject(this.devices, (each) => {
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
        let timeout = setTimeout( () => { $(obj).popover('hide'); }, 3000);
        $(obj).data('timeout1986', timeout);
    }

    public openDialog() {
        this.SelectedDevice = new Device();
        $('#modalCreate').modal('show');
    }
    public create(form: NgForm, btn: any) {
        if (form.invalid) {
            return false;
        }
        let _this = this;
        this.service.create(this.SelectedDevice).then((ret) => {
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
                this.devices = res.result as Device[];
                this.recordCount = res.total;
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
                this.devices = res.result as  Device[];
                this.recordCount = res.total;
            })
            .catch((err) => console.log(err.message || err));
        }
}
