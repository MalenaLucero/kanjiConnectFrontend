//const apiUrl = 'http://localhost:3000';
//const apiUrl = 'http://localhost:3000/api';
const apiUrl = 'https://kanji-connect-backend-nextjs.vercel.app/api';

export const environment = {
  production: false,
  login: apiUrl + '/auth/login',
  expressions: apiUrl + '/expressions',
  tags: apiUrl + '/tags',
  lessons: apiUrl + '/lessons',
  userKanji: apiUrl + '/user-kanji'
};
