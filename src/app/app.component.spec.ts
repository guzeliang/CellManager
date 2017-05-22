import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
    inject,
    async,
    TestBed,
    ComponentFixture
} from '@angular/core/testing';

// Load the implementations that should be tested
import { AppComponent } from './app.component';

describe(`App`, () => {
    let comp: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    
    // async beforeEach
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AppComponent ],
            schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents()
    .then( () => {
        fixture = TestBed.createComponent(AppComponent);
        comp    = fixture.componentInstance;
        fixture.detectChanges(); // trigger initial data binding
    
        return fixture.whenStable().then(() => {
            fixture.detectChanges();
        });
    });
    }));
    
    it(`should be readly initialized`, () => {
        expect(fixture).toBeDefined();
        expect(comp).toBeDefined();
    });
    
    it(`should be @AngularClass`, () => {
        expect(comp.hasHeader).toEqual(false);
    });
    
    it('should log ngOnInit', () => {
        spyOn(console, 'log');
        expect(console.log).not.toHaveBeenCalled();
        
        comp.ngOnInit();
        expect(console.log).toHaveBeenCalled();
    });
});
