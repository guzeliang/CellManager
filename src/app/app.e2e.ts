import { browser, by, element } from 'protractor';

describe('App', () => {
    beforeEach((done) => {
        browser.get('/');
        (browser.manage() as any).addCookie({name: 'name', value: 'test'}).then( (x) =>  {
            console.log('add cookie');
            done();
        });
    });

    it('should set a cookie', () => {
        browser.manage().getCookie('name').then((data) => {
            expect(data.value).toBe('test');
        });
    });
});
