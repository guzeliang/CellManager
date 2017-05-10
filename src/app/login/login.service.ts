import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {
    public apiUrl: string = '/api/customer';
    constructor(private http: Http) { }

    public singup(model: any): Promise<Response> {
        return this.http.post('/api/singup', model).toPromise();
    }

    public login(condition: Object): Promise<Response> {
        let opt = new RequestOptions({search: this.generateSearchParams(condition)});
        return this.http.get('/api/login', opt).toPromise();
    }

     private generateSearchParams(condition: Object): string {
        let ret: string[] = [];
        for (let each in condition) {
            if (condition.hasOwnProperty(each)) {
                ret.push(each + '=' + condition[each]);
            }
        }

        return ret.join('&');
    }
}
