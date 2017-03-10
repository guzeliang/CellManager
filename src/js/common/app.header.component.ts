import { Component } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
var $ = require('jquery');

@Component({
  selector: 'header',
  providers:[],
  template: `
    <div class="navbar navbar-inverse navbar-fixed-top" id="topNav" role="navigation" style="z-index: 4;">
        <div class="container">
            <div class="navbar-header">
                <a class="navbar-brand"  routerLink="/devices" style="margin-top:-4px;"><i class="glyphicon glyphicon-home"></i> 管理平台</a>
            </div>
            <div class="navbar-collapse">
               <ul class='nav navbar-nav'>
                   <li>
                        <a routerLink="/devices" (click)='addClassx($event)' routerLinkActive="active">设备</a>
                   </li>
                   <li>
                        <a routerLink="/customers" (click)='addClassx($event)'  routerLinkActive="active">客户</a>
                   </li>
                   <li>
                        <a routerLink="/consumables" (click)='addClassx($event)'  routerLinkActive="active">耗材</a>
                   </li>
               </ul>
            </div>
        </div>
    </div>
 `
})
export class HeaderComponent {
    addClassx(evt:any) {
        //处理鼠标移走后 选中样式就消失的bug
        $(evt.target).blur();
    }
}
