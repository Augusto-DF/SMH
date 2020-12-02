//Target Server
const URL = 'http://localhost:9000';

export function LOGIN_POST(body) {
  return {
    url: URL + '/login',
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

export function USER_GET(token) {
  return {
    url: URL + '/tokendecode',
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function TOKEN_VALIDATE_POST(token) {
  return {
    url: URL + '/tokendecodePOST',
    options: {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}
