import React from 'react';
import Button from '../UI/Forms/Button';
import Input from '../UI/Forms/Input';
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
        <Button value="Entrar" className="ButtonLogin" />
      </form>
    </section>
  );
};

export default LoginForm;
