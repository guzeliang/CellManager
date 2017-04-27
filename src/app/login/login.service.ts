import { Injectable } from '@angular/core';
import {Headers, Http, Response, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';


@Injectable()
export class LoginService {
    private apiUrl : string = '/api/customer';
    constructor(private http:Http) { }

    private generateSearchParams(condition:Object):string {
        let ret :string[] = [];
        for(let each in condition) {
            ret.push(each + '=' + condition[each]);
        }

        return ret.join('&');
    }
    singup(model:any): Promise<Response> {
        return this.http.post('/api/singup', model).toPromise();
    }

    login(condition:Object): Promise<Response> {
        var opt = new RequestOptions({search:this.generateSearchParams(condition)});
        return this.http.get('/api/login', opt).toPromise();
    }
}