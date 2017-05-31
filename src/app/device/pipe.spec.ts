import { MyDeviceType } from './pipe';

describe('TitleCasePipe', () => {
    // This pipe is a pure, stateless function so no need for BeforeEach
    let pipe = new MyDeviceType();
    
    it('transforms "1" to "反应器"', () => {
        expect(pipe.transform(1)).toBe('反应器');
    });
    
    it('transforms "2" to "清洗机"', () => {
        expect(pipe.transform(2)).toBe('清洗机');
    });
    
    it('transforms "3" to "灌流反应器"', () => {
        expect(pipe.transform(3)).toBe('灌流反应器');
    });
    
    it('transforms "4" to "未知类型"', () => {
        expect(pipe.transform(4)).toBe('未知类型');
    });
});
