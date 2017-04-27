import { Injectable } from '@angular/core';
import {Headers, Http, Response, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';


@Injectable()
export class CustomerService {
    private apiUrl : string = '/api/customer';
    constructor(private http:Http) { }

    private generateSearchParams(condition:Object):string {
        let ret :string[] = [];
        for(let each in condition) {
            ret.push(each + '=' + condition[each]);
        }

        return ret.join('&');
    }
    
    delete(id:number): Promise<Response> {
        return this.http.delete(this.apiUrl + '/' + id).toPromise();
    }

    update(model:any): Promise<Response> {
        return this.http.put(this.apiUrl, model).toPromise();
    }

    create(model:any): Promise<Response> {
        return this.http.post(this.apiUrl, model).toPromise();
    }

    get(condition:Object): Promise<Response> {
        var opt = new RequestOptions({search:this.generateSearchParams(condition)});
        return this.http.get(this.apiUrl + '/list', opt).toPromise();
    }

    page(condition:any): Promise<Response> {
        var opt = new RequestOptions({search:this.generateSearchParams(condition)});
        return this.http.get(this.apiUrl + '/page', opt).toPromise();
    }
}