const apiUrl = 'https://kanji-connect-backend-nextjs.vercel.app/api';

export const environment = {
  production: true,
  login: apiUrl + '/auth/login',
  expressions: apiUrl + '/expressions',
  tags: apiUrl + '/tags',
  lessons: apiUrl + '/lessons',
  userKanji: apiUrl + '/user-kanji'
};
