import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN_POST, USER_GET, TOKEN_VALIDATE_POST } from '../api';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [login, setLogin] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const userLogout = React.useCallback(
    async function () {
      setData(null);
      setLogin(false);
      setError(null);
      window.localStorage.removeItem('token');
      navigate('/');
    },
    [navigate],
  );

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json.token[0][0]);
    setLogin(true);
  }

  async function userLogin(username, password) {
    try {
      setError(null);
      const { url, options } = LOGIN_POST({ username, password });
      const response = await fetch(url, options);
      if (!response.ok) {
        const { menssage } = await response.json();
        setError(menssage);
        throw new Error(`Error: 401`);
      } else {
        const { token } = await response.json();
        window.localStorage.setItem('token', token);
        await getUser(token);
      }
    } catch (err) {
      setLogin(false);
    }
  }

  React.useEffect(() => {
    async function autoLogin() {
      setError(null);
      const token = window.localStorage.getItem('token');
      if (token) {
        try {
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error('Token inválido');
          await getUser(token);
          if (login && data.userIsAdmin) {
            navigate('/conta/admin');
          } else if (login) {
            navigate('/conta/user');
          }
        } catch (err) {
          userLogout();
        } finally {
        }
      }
    }
    autoLogin();
  }, [userLogout, navigate, login]);

  return (
    <UserContext.Provider value={{ userLogin, userLogout, login, data, error }}>
      {children}
    </UserContext.Provider>
  );
};
