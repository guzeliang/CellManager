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

import { DeviceService } from './device.service';

let fakeRes = {
    code: 'success',
    message: '',
    result: [{
        id: 1,
        name: '',
        type: 1,
        customerId: null,
        clientId: 'xxxxxxxxxxxxxxxxxx',
        description: '',
        address: '',
        status: 1,
        createdAt: 1495092266}, {
        id: 3,
        name: '',
        type: 1,
        customerId: null,
        clientId: '1111111111111111111111',
        description: '',
        address: '',
        status: 1,
        createdAt: 1495092266}],
    total: 2};

describe('DeviceService (mockBackend)', () => {
    beforeEach( async(() => {
        TestBed.configureTestingModule({
            imports: [ HttpModule ],
            providers: [
            DeviceService,
            { provide: XHRBackend, useClass: MockBackend }
            ]
        })
        .compileComponents();
    }));
    
    it('can instantiate service when inject service',
        inject([DeviceService], (service: DeviceService) => {
            expect(service instanceof DeviceService).toBe(true);
    }));
    
    it('can instantiate service with "new"', inject([Http], (http: Http) => {
        expect(http).not.toBeNull('http should be provided');
        let service = new DeviceService(http);
        expect(service instanceof DeviceService).toBe(true, 'new service should be ok');
    }));
    
    it('can provide the mockBackend as XHRBackend',
        inject([XHRBackend], (backend: MockBackend) => {
            expect(backend).not.toBeNull('backend should be provided');
    }));
    
    describe('when getHeroes', () => {
        let backend: MockBackend;
        let service: DeviceService;
        let fakeHeroes: any;
        let response: Response;
    
        beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
            backend = be;
            service = new DeviceService(http);
        }));
    
        it('should be OK when delete', async(inject([], () => {
            let resp = new Response(new ResponseOptions({status: 200, body: fakeRes.result[0]}));
            backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        
            service.delete(fakeRes.result[0].id)
                .then((res) => {
                    expect(res).toEqual(resp.json());
                });
        })));
    
        it('should be OK when update', async(inject([], () => {
            let resp = new Response(new ResponseOptions({status: 200, body: fakeRes.result[0]}));
            backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        
            service.page({})
                .then((res) => {
                    expect(res).toEqual(resp.json());
                });
        })));
    
        it('should be OK when create', async(inject([], () => {
            let resp = new Response(new ResponseOptions({status: 200, body: fakeRes.result[0]}));
            backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        
            service.page({})
                .then((res) => {
                    expect(res).toEqual(resp.json());
                });
        })));
    
        it('should be OK when page', async(inject([], () => {
            let resp = new Response(new ResponseOptions({status: 200, body: fakeRes}));
            backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        
            service.page({})
                .then((res) => {
                    expect(res).toEqual(resp.json());
                });
        })));
    
        it('should treat 404 as an error', async(inject([], () => {
            let resp = new Response(new ResponseOptions({status: 404}));
            backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        
            service.page({})
                .catch((err) => {
                    expect(err.message).toContain('request status :');
                });
        })));
    });
});
