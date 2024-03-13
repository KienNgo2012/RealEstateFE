import { UppercasePipe } from './uppercase.pipe';

describe('UppercasePipe', () => {
  it('create an instance', () => {
    const pipe = new UppercasePipe();
    expect(pipe).toBeTruthy();
  });

  it('create an uppercase', () => {
    const pipe = new UppercasePipe();
    expect(pipe.transform("123avDD")).toBe("123AVDD");
  });
});
