import React from 'react';
import styles from './Button3rdLeftIcon.module.css';

const Button3rdLeftIcon = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={
        props.isActived
          ? styles.button + ' ' + styles.actived
          : styles.button + ' ' + styles.desabled
      }
    >
      <img src={props.icon} alt={props.alt} />
      <span>{props.content}</span>
    </button>
  );
};

export default Button3rdLeftIcon;
