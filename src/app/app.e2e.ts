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

  // it('should have cookie with name test and value textValue',  () => {
  //       browser.manage().getCookie('name').then((data) => {
  //           expect(data.value).toBe('test');
  //       });
  //   });

  // it('should have a title', () => {
  //   let subject = browser.getTitle();
  //   let result  = '后台管理';
  //   browser.getTitle().then( (ret) => {
  //       expect(ret).toEqual(result);
  //   });
  // });

  // it('should have header', () => {
  //   let subject = element(by.tagName('h1')).isPresent();
  //   let result  = true;
  //   subject.then( (ret) => {
  //       expect(ret).toEqual(result);
  //   });
  // });

  // it('should have h1 ', () => {
  //   let subject = element(by.tagName('h1')).getText();
  //   let result  = '登录';
  //   subject.then( (ret) => {
  //       expect(ret).toEqual(result);
  //   });
  // });

  // it('should have buttons', () => {
  //   let subject = element(by.css('button')).getText();
  //   let result  = '登录';
  //   subject.then( (ret) => {
  //       expect(ret).toEqual(result);
  //   });
  // });

});
