const apiUrlPrivate = 'https://kanjiconnectbackend-hhj4-dev.fl0.io';
const apiUrl = 'https://kanji-connect-backend-nextjs.vercel.app/api';

export const environment = {
  production: true,
  login: apiUrlPrivate + '/auth/login',
  expressions: apiUrl + '/expressions',
  expressionsPrivate: apiUrlPrivate + '/expressions',
  tags: apiUrl + '/tags',
  tagsPrivate: apiUrlPrivate + '/tags',
  lessons: apiUrl + '/lessons',
  lessonsPrivate: apiUrlPrivate + '/lessons',
  userKanji: apiUrl + '/user-kanji',
  userKanjiPrivate: apiUrlPrivate + '/user-kanji',
};
