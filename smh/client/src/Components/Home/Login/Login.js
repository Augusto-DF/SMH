import React from 'react';
import LoginForm from './LoginForm';
import styles from './Login.module.css';
const Login = () => {
  return (
    <div className={styles.grid_col_1}>
      <LoginForm />
    </div>
  );
};

export default Login;
