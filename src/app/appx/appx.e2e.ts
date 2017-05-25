import { browser, by, element } from 'protractor';

import * as path from 'path';

describe('Appx', () => {
    beforeEach(() => {
        browser.get('/appx');
    });

    it('should can upload file', () => {
        let p = path.resolve(__dirname, '../../assets/images/bg02.png');
        element(by.css('input[type="file"]')).sendKeys(p);
        // let range = document.getElementById('range');
        // range.onchange(new Event());
        // let range = document.getElementById('fileUpload');
        // if (document.getElementById('fileUpload').dispatchEvent) {
        //     let  clickevent = document.createEvent('MouseEvents');
        //     clickevent.initEvent('click', true, true);
        //     document.getElementById('fileUpload').dispatchEvent(clickevent);
        // }
        // browser.sleep(50000);
    });
});
