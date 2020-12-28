import React from 'react';
import styles from './ButtonLogin.module.css';

const ButtonLogin = (props) => {
  return (
    <button className={styles.button} onClick={props.onClick}>
      {props.value}
    </button>
  );
};

export default ButtonLogin;
