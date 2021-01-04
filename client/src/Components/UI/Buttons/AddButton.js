import React from 'react';
import styles from './AddButton.module.css';

const AddButton = (props) => {
  return (
    <button className={styles.button} onClick={props.onClick}>
      <div className={styles.horBar}></div>
      <div className={styles.verBar}></div>
    </button>
  );
};

export default AddButton;
