import { DifficultyPipe } from './difficulty.pipe';

xdescribe('DifficultyPipe', () => {
  it('create an instance', () => {
    const pipe = new DifficultyPipe();
    expect(pipe).toBeTruthy();
  });
});
