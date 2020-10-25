import React from 'react';
import Button from '../../Forms/Button';
import Input from '../../Forms/Input';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  //Target Server
  const URL = 'http://localhost:9000/';

  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();

  function LOGIN_POST(body) {
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

  async function handleSubmit(e) {
    e.preventDefault();
    const { url, options } = LOGIN_POST({ username, password });
    console.log(url);
    console.log(options);
    const response = await fetch(url, options);
    const json = await response.text();
    return /*alert(json.menssage)*/ console.log(json);
  }
  return (
    <section>
      <form className={styles.form} onSubmit={handleSubmit} action="">
        <Input
          setTarget={setUsername}
          label="Usuário"
          type="text"
          name="username"
          onChange={(e) => {
            setUsername(e.target.value);
            console.log('Entrou');
          }}
        />
        <Input
          setTarget={setPassword}
          label="Senha"
          type="password"
          name="password"
        />
        <Button value="Entrar" className="ButtonLogin" />
      </form>
    </section>
  );
};

export default LoginForm;
