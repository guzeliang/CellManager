import { Injectable } from '@angular/core';
import { Appx } from './appx';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';

@Injectable()
export class AppxService {
    private apiUrl: string = '/api/device';
    constructor(private http: Http) { }

    public delete(id: string): Promise<Response> {
        return this.http.delete('/api/appxs/' + id).toPromise();
    }

    public page(): Promise<Response> {
        return this.http.get('/api/appxs').toPromise();
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
