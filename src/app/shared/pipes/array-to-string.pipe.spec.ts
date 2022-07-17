import { ArrayToStringPipe } from './array-to-string.pipe';

xdescribe('ArrayToStringPipe', () => {
  it('create an instance', () => {
    const pipe = new ArrayToStringPipe();
    expect(pipe).toBeTruthy();
  });
});
