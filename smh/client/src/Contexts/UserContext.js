import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN_POST } from '../api';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [login, setLogin] = React.useState(null);
  const navigate = useNavigate();

  async function userLogin(username, password) {
    try {
      const { url, options } = LOGIN_POST({ username, password });
      const response = await fetch(url, options);

      console.log(response);

      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      else {
        const { token } = await response.json();

        console.log(token);

        window.localStorage.setItem('token', token);
        //await USER_GET(token) // Traz as informações do usuario decodificada
      }
    } catch (err) {
      console.log('Erro ' + err);
    }
  }

  return (
    <UserContext.Provider value={{ userLogin, login }}>
      {children}
    </UserContext.Provider>
  );
};
