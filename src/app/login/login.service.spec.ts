import {
    async, inject, TestBed
} from '@angular/core/testing';

import {
    MockBackend,
    MockConnection
} from '@angular/http/testing';

import {
    HttpModule, Http, XHRBackend, Response, ResponseOptions
} from '@angular/http';

import { LoginService } from './login.service';

let fakeRes = {
    code: 'success',
    message: '',
    result: {
        id: 1,
        name: 'test',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        escription: null,
        ontact: '123456',
        ddress: 'abcd',
        tatus: 1,
        createdAt: 1494554832
    }};

////////  Tests  /////////////
describe('DeviceService (mockBackend)', () => {
    let backend: MockBackend;
    let service: LoginService;
    let fakeHeroes: any;
    let response: Response;

    beforeEach( async(() => {
        TestBed.configureTestingModule({
            imports: [ HttpModule ],
            providers: [
                LoginService,
                { provide: XHRBackend, useClass: MockBackend }
            ]
        })
        .compileComponents();
    }));

    beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
        backend = be;
        service = new LoginService(http);
    }));

    it('should be OK when login', async(inject([], () => {
        let resp = new Response(new ResponseOptions({status: 200, body: fakeRes.result}));
        backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

        service.login({}).then((res) => {
            expect(res).toEqual(resp.json());
        });
    })));

    it('should be OK when singup', async(inject([], () => {
        let resp = new Response(new ResponseOptions({status: 200, body: fakeRes.result}));
        backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

        service.singup({}).then((res) => {
            expect(res).toEqual(resp.json());
        });
    })));

    it('should treat 404 as an error', async(inject([], () => {
        let resp = new Response(new ResponseOptions({status: 404}));
        backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
    
        service.singup({}).catch((err) => {
            expect(err.message).toContain('request status :');
        });
    })));

});
