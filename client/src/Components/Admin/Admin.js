import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminMenu from './AdminMenu';
import styles from './Admin.module.css';
import ServicePainel from './Service/ServicePainel';

const Admin = () => {
  return (
    <>
      <div className={styles.bgMenuAdmin}>
        <div className="container">
          <AdminMenu />
        </div>
      </div>

      <section className="container">
        <Routes>
          <Route path="editService" element={<ServicePainel />} />
        </Routes>
      </section>
    </>
  );
};

export default Admin;
