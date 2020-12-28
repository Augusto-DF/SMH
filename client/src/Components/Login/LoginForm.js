import React from 'react';
import ButtonLogin from '../UI/Buttons/ButtonLogin';
import Input from '../UI/Inputs/Input';
import styles from './LoginForm.module.css';
import { UserContext } from '../../Contexts/UserContext';

const LoginForm = () => {
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();

  const { userLogin } = React.useContext(UserContext);

  async function handleSubmit(e) {
    e.preventDefault();
    userLogin(username, password);
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
          }}
        />
        <Input
          setTarget={setPassword}
          label="Senha"
          type="password"
          name="password"
        />
        <ButtonLogin value="Entrar" className="buttonLogin" />
      </form>
    </section>
  );
};

export default LoginForm;
