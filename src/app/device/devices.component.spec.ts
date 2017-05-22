import { inject, async, fakeAsync, TestBed, tick, ComponentFixture } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import {  MyDeviceType } from './pipe';
import {  DeviceService } from './device.service';
import { Ng2PaginationModule } from 'ng2-pagination/dist/ng2-pagination';
import { ActivatedRoute, Params }   from '@angular/router';
import { By } from '@angular/platform-browser';

import { DevicesComponent } from './devices.component';
import { ActivatedRouteStub } from '../testing/router-stub';

import { click } from '../testing';

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
let fakeResx = {
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
        total: 3};

let deviceServiceStub = {
    delete : () => {
      return Promise.resolve({x: 'x'});
    },
    update : () => {
      return Promise.resolve({x: 'x'});
    },
    create : () => {
      return Promise.resolve({x: 'x'});
    },
    get : () => {
      return Promise.resolve({x: 'x'});
    },
    page : () => {
      return Promise.resolve(fakeRes);
    }
  };

describe(`Devices`, () => {
    let comp: DevicesComponent;
    let deviceService: DeviceService;
    let fixture: ComponentFixture<DevicesComponent>;
    let activatedRoute  = new ActivatedRouteStub();
    
    // async beforeEach
    beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [FormsModule, Ng2PaginationModule],
        declarations: [ DevicesComponent, MyDeviceType ],
        providers:    [
        {provide: DeviceService, useValue: deviceServiceStub},
        {provide: ActivatedRoute, useValue: activatedRoute}
        ],
        schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents()
    .then(() => {
        fixture = TestBed.createComponent(DevicesComponent);
        comp = fixture.componentInstance;
        deviceService = fixture.debugElement.injector.get(DeviceService);
    });
    }));
    
    it(`should be readly initialized`, () => {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
    });
    
    it(`should have 2 devices by async`, async(() => {
    fixture.detectChanges();
    
    fixture.whenStable().then(() => {
        fixture.detectChanges();
    
        let x = fixture.debugElement.queryAll(By.css('.modelitems'));
        expect(x.length).toEqual(2);
    });
    }));
    
    it(`should have 3 devices by fakeasync`, fakeAsync(() => {
        spyOn(deviceService, 'page').and.returnValue(Promise.resolve(fakeResx));
        fixture.detectChanges();
        
        tick();
        fixture.detectChanges();
        
        let x = fixture.debugElement.queryAll(By.css('.modelitems'));
        expect(x.length).toEqual(3);
    }));
    
    it(`should have 3 devices by jasmine done`, (done) => {
        let spy = spyOn(deviceService, 'page').and.returnValue(Promise.resolve(fakeResx));
        
        fixture.detectChanges();
        spy.call(deviceService).then(() => {
            fixture.detectChanges();
        
            let x = fixture.debugElement.queryAll(By.css('.modelitems'));
            expect(x.length).toEqual(3);
        
            done();
        });
    });

    it(`should have 4 devices when click search button`, (done) => {
        fakeResx.result.push({
          id: 3,
          name: '',
          type: 1,
          customerId: null,
          clientId: '1111111111111111111111',
          description: '',
          address: '',
          status: 1,
          createdAt: 1495092266});
        fakeResx.total = 4;

        let spy = spyOn(deviceService, 'page').and.returnValue(Promise.resolve(fakeResx));
        let xspy = spyOn(comp, 'search');
        let btnSearch = fixture.debugElement.query(By.css('#btnSearch'));
        click(btnSearch);

        expect(xspy.calls.any()).toBe(true);

        fixture.detectChanges();
        spy.call(deviceService).then(() => {
            fixture.detectChanges();
        
            let x = fixture.debugElement.queryAll(By.css('.modelitems'));
            expect(x.length).toEqual(4);
        
            done();
        });
    });
});
