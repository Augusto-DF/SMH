import React from 'react';
import styles from './ButtonLeftIcon.module.css';

const ButtonLeftIcon = (props) => {
  return (
    <button className={styles.button} onClick={props.onClick}>
      <img src={props.icon} alt={props.alt} />
      <span>{props.content}</span>
    </button>
  );
};

export default ButtonLeftIcon;
