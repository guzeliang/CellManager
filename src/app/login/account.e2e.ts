import { browser, by, element } from 'protractor';

describe('Account', () => {
    beforeEach(() => {
        browser.get('/login/singup');
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

    it('should  contact is not empty ', () => {
        element(by.name('contact')).clear();
        element(by.name('contact')).sendKeys('');

        element(by.css('.contact-required-err')).isDisplayed().then((ret) => {
            expect(ret).toBe(true);
        });
    });

    it('should  contact lenght not < 5 ', () => {
        element(by.name('contact')).clear();
        element(by.name('contact')).sendKeys('aaa');

        element(by.css('.contact-length-err')).isDisplayed().then((ret) => {
            expect(ret).toBe(true);
        });
    });

    it('should  contact is ok when lenght >= 4 ', () => {
        element(by.name('contact')).clear();
        element(by.name('contact')).sendKeys('123456');

        element(by.css('.contact-length-err')).isPresent().then((ret) => {
            expect(ret).toBe(false);
        });

        element(by.css('.contact-required-err')).isPresent().then((ret) => {
            expect(ret).toBe(false);
        });
    });

    it('should  address is not empty ', () => {
        element(by.name('address')).clear();
        element(by.name('address')).sendKeys('');

        element(by.css('.address-required-err')).isDisplayed().then((ret) => {
            expect(ret).toBe(true);
        });
    });

    it('should  address lenght not < 4 ', () => {
        element(by.name('address')).clear();
        element(by.name('address')).sendKeys('aaa');

        element(by.css('.address-length-err')).isDisplayed().then((ret) => {
            expect(ret).toBe(true);
        });
    });

    it('should  address is ok when lenght >= 4 ', () => {
        element(by.name('address')).clear();
        element(by.name('address')).sendKeys('123456');

        element(by.css('.address-length-err')).isPresent().then((ret) => {
            expect(ret).toBe(false);
        });

        element(by.css('.address-required-err')).isPresent().then((ret) => {
            expect(ret).toBe(false);
        });
    });

    it('should can singup', () => {
        element(by.name('name')).clear();
        element(by.name('name')).sendKeys('test' + Math.random().toString().slice(-5));
        element(by.name('password')).clear();
        element(by.name('password')).sendKeys('123456');
        element(by.name('contact')).clear();
        element(by.name('contact')).sendKeys('18221754915');
        element(by.name('address')).clear();
        element(by.name('address')).sendKeys('test');

        browser.getCurrentUrl().then((old) => {
            element(by.id('btnSave')).click();

            browser.getCurrentUrl().then((ret) => {
                expect(ret).not.toEqual(old);
            });
        });
        browser.sleep(2000);
    });

});
