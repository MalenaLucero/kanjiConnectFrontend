import { UserKanjiCastPipe } from './user-kanji-cast.pipe';

xdescribe('UserKanjiCastPipe', () => {
  it('create an instance', () => {
    const pipe = new UserKanjiCastPipe();
    expect(pipe).toBeTruthy();
  });
});
