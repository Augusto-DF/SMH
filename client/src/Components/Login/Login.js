import React from 'react';
import LoginForm from './LoginForm';
import styles from './Login.module.css';
import { UserContext } from '../../../Contexts/UserContext';
import Error from '../../UI/Error/Error';
const Login = () => {
  const { error } = React.useContext(UserContext);
  return (
    <div className={styles.grid_col_1}>
      <LoginForm />
      {error && <Error typeError="grave" value={error} />}
    </div>
  );
};

export default Login;
