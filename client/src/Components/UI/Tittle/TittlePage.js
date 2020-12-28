import React from 'react';
import styles from './TttlePage.module.css';

const TittlePage = (props) => {
  return (
    <div className={styles.tittle}>
      <h3>{props.content}</h3>
      <div className={styles.separator}></div>
    </div>
  );
};

export default TittlePage;
