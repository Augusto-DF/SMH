import React from 'react';
import LoginForm from './Login/LoginForm';
import styles from './Home.module.css';

const Home = () => {
  return (
    <section className={`container ${styles.grid_col_1}`}>
      <div className={styles.col1}>Home</div>
      <LoginForm className={styles.col1} />
    </section>
  );
};

export default Home;
