import React from 'react';
import styles from './Input.module.css';

const Input = (props) => {
  return (
    <>
      <label htmlFor={props.name} className={styles.label}>
        {props.label}
      </label>
      <input
        id={props.name}
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        className={styles.input}
      />
    </>
  );
};

export default Input;
