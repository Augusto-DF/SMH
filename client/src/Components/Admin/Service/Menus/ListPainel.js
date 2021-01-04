import React from 'react';
import AddButton from '../../../UI/Buttons/AddButton';
import LinstIten from '../../ListItens/LinstIten';
import styles from './ListPainel.module.css';

const ListPainel = (props) => {
  const [activeCont, setActiveCont] = React.useState(0);

  React.useEffect(() => {
    activeCont > 0
      ? props.setActivedActions(true)
      : props.setActivedActions(false);
  }, [activeCont]);

  return (
    <div className={styles.wrapper}>
      {props.listService.length > 0 ? (
        props.listService.map((service, ii) => {
          return (
            <LinstIten
              key={ii}
              idTarget={service.service_id}
              label={service.serviceName}
              activeCont={activeCont}
              setActiveCont={setActiveCont}
              listIcon={props.listIcon}
              listFunctions={props.listFunctions}
            />
          );
        })
      ) : (
        <span className={styles.noServices}>Não há serviços Cadastrados</span>
      )}
      <AddButton />
    </div>
  );
};

export default ListPainel;
