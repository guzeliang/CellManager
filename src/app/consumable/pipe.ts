import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'myConsumableType'
})
export class MyConsumableType implements PipeTransform {
    public transform(value: any, args?: any): any {
        let type;
        switch (value) {
            case 1:
                type = '反应器';
            break;
            case 2:
                type = '清洗机';
            break;
            case 3:
                type = '灌流反应器';
            break;
            default:
                type = '通用';
            break;
        }
        return type;
    }
}
