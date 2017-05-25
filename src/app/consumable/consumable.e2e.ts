import { browser, by, element } from 'protractor';

describe('Consumables', () => {
    beforeEach(() => {
        browser.get('/consumables');
        browser.manage().deleteAllCookies().then( () => {
            (browser.manage() as any).addCookie({name: 'name', value: 'test'}).then( () => {
                browser.get('/consumables');
            }); 
        });
    });

    afterEach(() => {
        browser.manage().deleteAllCookies();
    });

    it('should get a cookie', () => {
        browser.manage().getCookie('name').then((data) => {
            expect(data.value).toBe('test');
        });
    });

    it('should pageInfo equal 耗材', () => {
        let subject = element(by.css('.pageInfo')).getText();
        let result  = '耗材';
        subject.then( (ret) => {
            expect(ret.trim()).toEqual(result);
        });
    });

    it('should show error when 编号 is empty', () => {
        let subject = element(by.id('btnCreate')).isPresent();
        subject.then( (ret) => {
            expect(ret).toEqual(true);
        });
    
        element(by.id('btnCreate')).click();

        element(by.id('txtId')).sendKeys('');
        element(by.css('.id-required-err')).isDisplayed().then((ret) => {
            expect(ret).toBe(true);
        });
    });

    it('should show error when 编号 lenght less than 10', () => {
        let subject = element(by.id('btnCreate')).isPresent();
        subject.then( (ret) => {
            expect(ret).toEqual(true);
        });

        element(by.id('btnCreate')).click();
    
        element(by.id('txtId')).sendKeys('test');
        element(by.css('.id-length-err')).isDisplayed().then((ret) => {
            expect(ret).toBe(true);
        });
    });

    it('should can create consumable', () => {
        let subject = element(by.id('btnCreate')).isPresent();
        subject.then( (ret) => {
            expect(ret).toEqual(true);
        });

        element(by.id('btnCreate')).click();

        element(by.id('txtId')).clear();
        element(by.id('txtName')).clear();
        element(by.id('txtDesc')).clear();

        element(by.id('txtId')).sendKeys('bar' + Math.random().toString().slice(-7));
        element(by.id('txtName')).sendKeys('bar');
        element(by.id('txtDesc')).sendKeys('test' + Math.random().toString().slice(-7));

        element(by.id('btnSave')).click();
        element.all(by.css('.device-item')).count().then((ret) => {
            expect(ret).toBeGreaterThan(0);
        });

        browser.sleep(1000);
    });

    it('should can search consumable by keyword bar', () => {
        element(by.id('txtSearch')).clear();
        element(by.id('txtSearch')).sendKeys('bar');
        element(by.id('btnSearch')).click();
        browser.sleep(1000);
        
        element.all(by.css('.device-item')).count().then((count) => {
            expect(count).toBeGreaterThan(0);
        });
    });

    it('should can not search consumable by keyword baz', () => {
        element(by.id('txtSearch')).clear();
        element(by.id('txtSearch')).sendKeys('baz');
        element(by.id('btnSearch')).click();

        element.all(by.css('.device-item')).count().then((count) => {
            expect(count).toBe(0);
        });
    });

    it('should can search consumable by blank', () => {
        element(by.id('txtSearch')).clear();
        element(by.id('txtSearch')).sendKeys(' ');
        element(by.id('btnSearch')).click();

        element.all(by.css('.device-item')).count().then((count) => {
            expect(count).toBeGreaterThan(0);
        });
    });

    it('should can remove consumable', () => {
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
