import React from 'react';
import styles from './Input.module.css';

const Input = (props) => {
  function handleChange(e) {
    props.setTarget(e.target.value);
  }

  function handleBlur(e) {
    console.log('Blur');
  }
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
        onChange={props.onChange ? props.onChange : handleChange}
        onBlur={props.onBlur ? props.onBlur : handleBlur}
        className={styles.input}
      />
    </>
  );
};

export default Input;
