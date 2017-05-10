import { Component, OnInit, Input, Output } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { ActivatedRoute, Params }   from '@angular/router';
import { NgForm } from '@angular/forms';
import { Appx } from './appx';
import { AppxService } from './appx.service';

import * as bs from 'bootstrap';
import * as $ from 'jquery';
import * as _ from 'underscore';
import { FileUploader } from 'ng2-file-upload';

@Component({
    selector: 'appx',
    templateUrl: './appx.component.html',
    styles: [`
        .fileinput-button {
          position: relative;
          overflow: hidden;
        }
        .fileinput-button input {
          position: absolute;
          top: 0;
          right: 0;
          margin: 0;
          opacity: 0;
          -ms-filter: 'alpha(opacity=0)';
          font-size: 200px;
          direction: ltr;
          cursor: pointer;
        }
        
        /* Fixes for IE < 8 */
        @media screen\9 {
          .fileinput-button input {
            filter: alpha(opacity=0);
            font-size: 100%;
            height: 100%;
          }
        }
        
    `]
})
export class AppxComponent implements OnInit {
    public params: any = {};
    public devices: Appx[];
    public recordCount: number;
    public pageSize: number = 10;
    public pageIndex: number = 1;
    public searchWord: string = '';
    public isUploading: boolean = false;
    public xprogress: number = 0;

    public SelectedDevice: Appx = new Appx();
    public uploader: FileUploader = new FileUploader({
        url: '/api/uploadFile',
        method: 'POST',
        itemAlias: 'uploadedfile'
    });

    constructor( private http: Http, private service: AppxService, private route: ActivatedRoute) {
    }

    public selectedFileOnChanged(event: any) {
        console.log( event.target.value);
        let x = event.target.value.split('.').pop();
        if (x !== 'zip' && x !== 'rar') {
            return this.popBy('#spFileInput', '只能上传zip或rar文件', '');
        }
        this.uploadFile();
    }
    public uploadFile() {
        // 上传
        this.isUploading = true;
        this.xprogress = 0;
        let that = this;
        this.uploader.queue[0].onSuccess = (response, status, headers) => {
            let tempRes = JSON.parse(response);

            // 如果是单文件 必须清空队列
            that.uploader.clearQueue();
            setTimeout(() => {
                that.isUploading = false;
                that.xprogress = 0;
            }, 1000);
            console.log(tempRes, this.isUploading );
            // 上传文件成功
            if (status === 200) {
                that.pageChange();
                // 上传文件后获取服务器返回的数据
            } else {
                // 上传文件后获取服务器返回的数据错误
            }
        };
        this.uploader.queue[0].onProgress = (x) => {
            that.xprogress = x;
        };
        this.uploader.queue[0].upload(); // 开始上传
    }

   public remove(device: Appx, evt: any) {
        this.service.delete(device.name).then( (res) => {
            let ret = res.json();
            if (ret.code === 'success') {
                this.devices = _.reject(this.devices, (each) => {
                    return each.name === device.name;
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
        this.SelectedDevice = new Appx();
        $('#modalCreate').modal('show');
    }
    public pageChange() {
        this.service.page()
            .then( (res) => {
                this.devices = res.json().result as Appx[];
                this.recordCount = res.json().total;
            })
            .catch((err) => console.log(err.message || err));
    }
    public ngOnInit(): void {
        this.service.page()
            .then( (res) => {
                this.devices = res.json().result as  Appx[];
                this.recordCount = res.json().total;
            })
            .catch((err) => console.log(err.message || err));
        }
}
