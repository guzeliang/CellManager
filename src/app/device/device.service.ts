import { Injectable } from '@angular/core';
import { Device } from './device';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';

@Injectable()
export class DeviceService {
    private apiUrl: string = '/api/device';
    constructor(private http: Http) { }

    public delete(id: number): Promise<any> {
        return this.http.delete(this.apiUrl + '/' + id).toPromise().then((res) => {
            if (res.status === 200 || res.status === 304) {
                return Promise.resolve(res.json());
            }

            return Promise.reject(new Error('request status :' + res.status));
        });
    }

    public update(model: any): Promise<any> {
        return this.http.put(this.apiUrl, model).toPromise().then((res) => {
            if (res.status === 200 || res.status === 304) {
                return Promise.resolve(res.json());
            }

            return Promise.reject(new Error('request status :' + res.status));
        });
    }

    public create(model: any): Promise<any> {
        return this.http.post(this.apiUrl, model).toPromise().then((res) => {
            if (res.status === 200 || res.status === 304) {
                return Promise.resolve(res.json());
            }

            return Promise.reject(new Error('request status :' + res.status));
        });
    }

    public get(condition: Object): Promise<any> {
        let opt = new RequestOptions({search: this.generateSearchParams(condition)});
        return this.http.get(this.apiUrl + '/list', opt).toPromise().then((res) => {
            if (res.status === 200 || res.status === 304) {
                return Promise.resolve(res.json());
            }

            return Promise.reject(new Error('request status :' + res.status));
        });
    }

    public page(condition: any): Promise<any> {
        let opt = new RequestOptions({search: this.generateSearchParams(condition)});
        return this.http.get(this.apiUrl + '/page', opt).toPromise().then((res) => {
            if (res.status === 200 || res.status === 304) {
                return Promise.resolve(res.json());
            }

            return Promise.reject(new Error('request status :' + res.status));
        });
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
