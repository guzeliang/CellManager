import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { CookieService } from 'ngx-cookie';
import { Router }   from '@angular/router';

import * as $ from 'jquery';

@Component({
  selector: 'header',
  styles: [
      '../../assets/css/bootstrap.css'
  ],
  template: `
    <div class="navbar navbar-inverse navbar-fixed-top"  style="z-index: 4;">
        <div class="container">
            <div class="navbar-header">
                <a class="navbar-brand"  routerLink="/devices" style="margin-top:-4px;">
                <i class="glyphicon glyphicon-home"></i> 管理平台</a>
            </div>
            <div class="navbar-collapse">
               <ul class='nav navbar-nav'>
                   <li>
                        <a routerLink="/devices" (click)='addClassx($event)' 
                        routerLinkActive="active">设备</a>
                   </li>
                   <li>
                        <a routerLink="/customers" (click)='addClassx($event)'  
                        routerLinkActive="active">客户</a>
                   </li>
                   <li>
                        <a routerLink="/consumables" (click)='addClassx($event)'  
                        routerLinkActive="active">耗材</a>
                   </li>
                   <li>
                        <a routerLink="/appx" (click)='addClassx($event)'  
                        routerLinkActive="active">客户端升级</a>
                   </li>
               </ul>
                <ul class="nav navbar-nav navbar-right" *ngIf='name'>
				 <li class="dropdown">
				    <a href="#" class="dropdown-toggle" data-toggle="dropdown">{{name}}<b class="caret"></b></a>
				 	<ul class="dropdown-menu">
						<li><a (click)='logout()'>注销</a></li>
					</ul>
				</li>
			</ul>
            </div>
            
        </div>
    </div>
 `
})
export class HeaderComponent implements OnInit, AfterContentChecked {
    public name: string;
    constructor( private http: Http, private _service: CookieService, private router: Router) {
    }

    public addClassx(evt: any) {
        // 处理鼠标移走后 选中样式就消失的bug
        $(evt.target).blur();
    }
    public logout() {
        this.http.get('/api/logout').toPromise().then((res) => {
            this.router.navigate(['/login']);
        }).catch((err) => {
            console.log(err.message);
        });
    }

    public ngOnInit(): void {
        if (this._service.get('name')) {
            this.name = this._service.get('name');
        }
    }

    public ngAfterContentChecked(): void {
        this.name = this._service.get('name');
    }
}
