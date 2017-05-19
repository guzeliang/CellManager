import { browser, by, element } from 'protractor';

describe('App', () => {
    beforeAll((done) => {
        browser.get('/');
        (browser.manage() as any).addCookie({name: 'name', value: 'test'}).then( (x) =>  {
            done();
        });
    });

    afterAll(() => {
        browser.manage().deleteAllCookies();
    });

    it('should get a cookie', () => {
        browser.manage().getCookie('name').then((data) => {
            expect(data.value).toBe('test');
        });
    });

    it('should pageInfo equal 设备', () => {
        let subject = element(by.css('.pageInfo')).getText();
        let result  = '设备';
        subject.then( (ret) => {
            expect(ret.trim()).toEqual(result);
        });
    });

    it('should can create device', () => {
        let subject = element(by.id('btnCreate')).isPresent();
        subject.then( (ret) => {
            expect(ret).toEqual(true);
        });

        element(by.id('btnCreate')).click();
        // 长度<10 error
        element(by.id('txtId')).sendKeys('test');
        element(by.id('txtDesc')).sendKeys('test');

        element(by.css('.txt-id-err')).isDisplayed().then((ret) => {
            expect(ret).toBe(true);
        });

        element(by.id('txtId')).clear();
        element(by.id('txtDesc')).clear();
        element(by.id('txtId')).sendKeys('bar' + Math.random().toString().slice(-7));
        element(by.id('txtDesc')).sendKeys('test');

        element(by.id('btnSave')).click();
        element.all(by.css('.a-remove')).count().then((ret) => {
            expect(ret).toBeGreaterThan(0);
        });
    });

    it('should can search device by keyword bar', () => {
        element(by.id('txtSearch')).sendKeys('bar');
        element(by.id('btnSearch')).click();

        element.all(by.css('.modelitems')).count().then((count) => {
            expect(count).toBeGreaterThan(0);
        });
    });

    it('should can not search device by keyword baz', () => {
        element(by.id('txtSearch')).clear();
        element(by.id('txtSearch')).sendKeys('baz');
        element(by.id('btnSearch')).click();

        element.all(by.css('.modelitems')).count().then((count) => {
            expect(count).toBe(0);
        });
    });

    it('should can search device by blank', () => {
        element(by.id('txtSearch')).clear();
        element(by.id('txtSearch')).sendKeys(' ');
        element(by.id('btnSearch')).click();

        element.all(by.css('.modelitems')).count().then((count) => {
            expect(count).toBeGreaterThan(0);
        });
    });

    it('should can remove device', () => {
        element.all(by.css('.a-remove')).count().then((ret) => {
            expect(ret).toBeGreaterThan(0);
        });

        element.all(by.linkText('删除')).each( (o, i) => {
            o.click();
            let alertDialog = browser.switchTo().alert();
            browser.sleep(1000);
            alertDialog.accept(); // alertDialog.dismiss();
            browser.sleep(1000);
        });
    });

});
