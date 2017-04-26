import { Component, OnInit, Input, Output } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { ActivatedRoute, Params }   from '@angular/router';
import { NgForm } from '@angular/forms';
import {FileUploader} from "ng2-file-upload";

import {Appx} from './appx';
import {AppxService} from './appx.service';

var $ = require('jquery');
require('bootstrap');
import * as _ from 'underscore';


@Component({
    selector: 'appx',
    templateUrl: './appx.component.html',
    styles:[`
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
    params:any = {};
    public devices: Appx[];
    public recordCount:number;
    public pageSize:number = 10;
    public pageIndex:number = 1;
    public searchWord:string="";
    public isUploading:boolean = false;
    public xprogress:number =0;

    public SelectedDevice:Appx = new Appx;
    public uploader:FileUploader = new FileUploader({
        url: "/api/uploadFile",
        method: "POST",
        itemAlias: "uploadedfile"
    });

    selectedFileOnChanged(event:any) {
       console.log( event.target.value);
        var x = event.target.value.split('.').pop();
        if(x != 'zip' && x != 'rar') {
            return this.popBy('#spFileInput', '只能上传zip或rar文件','')
        }

        this.uploadFile();
    }
    
    uploadFile() {
        // 上传
        this.isUploading = true;
        this.xprogress = 0;
        let _this = this;
        this.uploader.queue[0].onSuccess = function (response, status, headers) {
            let tempRes = JSON.parse(response);
            //如果是单文件 必须清空队列
            _this.uploader.clearQueue();
            setTimeout(function() {
                _this.isUploading = false;
                _this.xprogress = 0;
            }, 1000);
            
            console.log(tempRes, this.isUploading )
            // 上传文件成功
            if (status == 200) {
                _this.pageChange();
                // 上传文件后获取服务器返回的数据
            } else {
                // 上传文件后获取服务器返回的数据错误
            }
        };
        this.uploader.queue[0].onProgress = function(x) {
            _this.xprogress = x;
        }
        this.uploader.queue[0].upload(); // 开始上传
    }

    constructor( private http:Http, private service:AppxService,private route: ActivatedRoute) {
    }
    
    
    remove(device:Appx, evt:any) {
        this.service.delete(device.name).then(res => {
            var ret = res.json();
            if(ret.code === 'success') {
                this.devices = _.reject(this.devices, (each) => {
                    return each.name === device.name;
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
        this.SelectedDevice = new Appx;
        $('#modalCreate').modal('show');
    }
    
    pageChange() {
        this.service.page()
            .then( res => {
                this.devices = res.json().result as Appx[];
                this.recordCount = res.json().total;
            })
            .catch(err => console.log(err.message || err))
    }
    
    ngOnInit(): void {
        this.service.page()
            .then( res => {
                this.devices = res.json().result as  Appx[];
                this.recordCount = res.json().total;
            })
            .catch(err => console.log(err.message || err))
        }
}