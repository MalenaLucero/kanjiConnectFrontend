import { FirstTitlecasePipe } from './first-titlecase.pipe';

xdescribe('FirstTitlecasePipe', () => {
  it('create an instance', () => {
    const pipe = new FirstTitlecasePipe();
    expect(pipe).toBeTruthy();
  });
});
