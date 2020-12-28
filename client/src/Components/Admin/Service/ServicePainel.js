import React from 'react';
import ButtonLeftIcon from '../../UI/Buttons/ButtonLeftIcon';
import SelectersActions from '../../UI/Menus/SelectersActions';
import TittlePage from '../../UI/Tittle/TittlePage';
import addIcon from './../../../Assets/addIcon.svg';
import styles from './ServicePainel.module.css';

const ServicePainel = () => {
  //State que ativa o menu de actions
  const [activedActions, setActivedActions] = React.useState(false);

  async function addService(e) {}

  return (
    <div className={styles.serviceContainer}>
      <TittlePage content="Editar Serviços" />
      <ButtonLeftIcon
        content="Adicionar Serviço"
        icon={addIcon}
        onClick={addService}
      />
      <SelectersActions actived={activedActions} />
    </div>
  );
};

export default ServicePainel;
