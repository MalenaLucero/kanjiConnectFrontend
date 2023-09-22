import { BoldWordInStringPipe } from './bold-word-in-string.pipe';

xdescribe('BoldWordInStringPipe', () => {
  it('create an instance', () => {
    const pipe = new BoldWordInStringPipe();
    expect(pipe).toBeTruthy();
  });
});
