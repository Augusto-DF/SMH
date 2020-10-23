import React from 'react';
import Button from '../../Forms/Button';
import Input from '../../Forms/Input';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  function hendleChange(e) {
    e.preventDefault();
    console.log('mudando');
  }

  function hendleBlur() {
    console.log('Blur');
  }
  return (
    <section>
      <form className={styles.form}>
        <Input
          label="Usuário"
          type="text"
          name="username"
          onChange={hendleChange}
          onBlur={hendleBlur}
        />
        <Input
          label="Senha"
          type="password"
          name="password"
          onChange={hendleChange}
          onBlur={hendleBlur}
        />
        <Button value="Entrar" className="ButtonLogin" />
      </form>
    </section>
  );
};

export default LoginForm;
