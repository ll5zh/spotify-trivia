export const CLIENT_ID = '7576b11b3736486ebc54dff50859fd0d';
export const REDIRECT_URI = 'http://localhost:3000/spotify-trivia/redirect';
export const SCOPE = 'user-read-private user-read-email user-top-read user-read-recently-played';
export const BASE_URL = 'https://api.spotify.com/v1';

export function getMonth(n) {
  switch(n) {
    case 1: return 'January';
    case 2: return 'February';
    case 3: return 'March';
    case 4: return 'April';
    case 5: return 'May';
    case 6: return 'June';
    case 7: return 'July';
    case 8: return 'August';
    case 9: return 'September';
    case 10: return 'October';
    case 11: return 'November';
    case 12: return 'December';
  }
}
