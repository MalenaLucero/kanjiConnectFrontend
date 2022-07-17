import { ExpressionCastPipe } from './expression-cast.pipe';

xdescribe('ExpressionCastPipe', () => {
  it('create an instance', () => {
    const pipe = new ExpressionCastPipe();
    expect(pipe).toBeTruthy();
  });
});
