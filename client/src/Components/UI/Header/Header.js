import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../Contexts/UserContext';
import styles from './Header.module.css';
const Header = () => {
  const { data, login, userLogout } = React.useContext(UserContext);
  return (
    <div className={styles.header}>
      <nav className="container">
        {login ? <h2>{data.userNickName}</h2> : <h2>Agenda incrivel</h2>}
        {login && (
          <Link
            to={data.userIsAdmin ? '/conta/admin' : '/conta/user'}
            className={styles.alignRigth}
          >
            Início
          </Link>
        )}
        {login && (
          <Link to="" onClick={userLogout}>
            Sair
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Header;
