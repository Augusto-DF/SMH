import React from 'react';
import AdminMenu from './AdminMenu';
import styles from './Admin.module.css';

const Admin = () => {
  return (
    <section className={styles.bgMenuAdmin}>
      <div className="container">
        <AdminMenu />
      </div>
    </section>
  );
};

export default Admin;
