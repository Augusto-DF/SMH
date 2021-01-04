import React from 'react';
import ButtonLeftIcon from '../../UI/Buttons/ButtonLeftIcon';
import SelectersActions from './Menus/SelectersActions';
import TittlePage from '../../UI/Tittle/TittlePage';
import addIcon from './../../../Assets/addIcon.svg';
import styles from './ServicePainel.module.css';
import ListPainel from './Menus/ListPainel';
import addUserabled from './../../../Assets/add-user-enabled.svg';
import trashIconenabled from './../../../Assets/trash-icon-enabled.svg';
import editIcon from './../../../Assets/edit-icon.svg';
import { SERVICES_GET } from '../../../API/api';

const ServicePainel = () => {
  //State que ativa o menu de actions
  const [activedActions, setActivedActions] = React.useState(false);
  const [services, setServices] = React.useState(false);

  /**
   * @description Retorna os serviços.
   */
  async function getServices() {
    const { url, options } = SERVICES_GET();
    const response = await fetch(url, options);
    const json = await response.json();
    return json;
  }

  React.useEffect(async () => {
    setServices(await getServices());
  }, [setServices]);

  /**
   * @description Edita um serviço.
   */
  async function editService(idService) {
    console.log('Edita um serviço');
  }

  /**
   * @description Adiciona um funcionário a um serviço
   */
  async function addFunc(idService) {
    console.log('Adiciona Funcionário a este serviço');
    console.log(idService);
  }

  /**
   * @description Deleta um Serviço.
   */
  async function deleteService(idService) {
    console.log('Deleta um serviço');
  }

  /**
   * @description Adiciona um serviço.
   */
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
      <ListPainel
        setActivedActions={setActivedActions}
        listIcon={[editIcon, addUserabled, trashIconenabled]}
        listFunctions={[editService, addFunc, deleteService]}
        listService={services ? services : []}
      />
    </div>
  );
};

export default ServicePainel;
