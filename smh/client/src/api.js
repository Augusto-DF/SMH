//Target Server
const URL = 'http://localhost:9000/';

export function LOGIN_POST(body) {
  return {
    url: URL + 'login',
    options: {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}
