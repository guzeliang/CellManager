import { browser, by, element } from 'protractor';

describe('Login', () => {
    beforeEach(() => {
        browser.get('/login');
    });

    it('should  name is not empty ', () => {
        element(by.name('name')).clear();
        element(by.name('name')).sendKeys('');

        element(by.css('.name-required-err')).isDisplayed().then((ret) => {
            expect(ret).toBe(true);
        });
    });

    it('should  name lenght not < 4 ', () => {
        element(by.name('name')).clear();
        element(by.name('name')).sendKeys('aaa');

        element(by.css('.name-length-err')).isDisplayed().then((ret) => {
            expect(ret).toBe(true);
        });
    });

    it('should  name is ok when lenght >= 4 ', () => {
        element(by.name('name')).clear();
        element(by.name('name')).sendKeys('test');

        element(by.css('.name-length-err')).isPresent().then((ret) => {
            expect(ret).toBe(false);
        });

        element(by.css('.name-required-err')).isPresent().then((ret) => {
            expect(ret).toBe(false);
        });
    });

    it('should  password is not empty ', () => {
        element(by.name('password')).clear();
        element(by.name('password')).sendKeys('');

        element(by.css('.password-required-err')).isDisplayed().then((ret) => {
            expect(ret).toBe(true);
        });
    });

    it('should  password lenght not < 4 ', () => {
        element(by.name('password')).clear();
        element(by.name('password')).sendKeys('aaa');

        element(by.css('.password-length-err')).isDisplayed().then((ret) => {
            expect(ret).toBe(true);
        });
    });

    it('should  password is ok when lenght >= 4 ', () => {
        element(by.name('password')).clear();
        element(by.name('password')).sendKeys('123456');

        element(by.css('.password-length-err')).isPresent().then((ret) => {
            expect(ret).toBe(false);
        });

        element(by.css('.password-required-err')).isPresent().then((ret) => {
            expect(ret).toBe(false);
        });
    });

    it('should can login', () => {
        element(by.name('name')).clear();
        element(by.name('name')).sendKeys('test');
        element(by.name('password')).clear();
        element(by.name('password')).sendKeys('123456');

        browser.getCurrentUrl().then((old) => {
            element(by.id('btnSave')).click();

            browser.getCurrentUrl().then((ret) => {
                expect(ret).not.toEqual(old);
            });
        });
        browser.sleep(2000);
    });

});
