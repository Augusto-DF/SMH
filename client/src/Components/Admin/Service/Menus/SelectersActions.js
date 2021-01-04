import React from 'react';
import Button3rdLeftIcon from '../../../UI/Buttons/Button3rdLeftIcon';
import styles from './SelectersActions.module.css';
import trashIconDesabled from './../../../../Assets/trash-icon-desabled.svg';
import trashIconenabled from './../../../../Assets/trash-icon-enabled.svg';
import addUserabled from './../../../../Assets/add-user-enabled.svg';
import addUserDesabled from './../../../../Assets/add-user-desabled.svg';

const SelectersActions = (props) => {
  return (
    <div className={styles.menu}>
      <Button3rdLeftIcon
        content="Excluir Selecionados"
        icon={props.actived ? trashIconenabled : trashIconDesabled}
        alt={
          props.actived
            ? 'Ícone de deleção de serviço'
            : 'Ícone de deleção de serviço desabilitado'
        }
        isActived={props.actived}
      />
      <Button3rdLeftIcon
        content="Adicionar Funcionários aos Selecionados"
        icon={props.actived ? addUserabled : addUserDesabled}
        alt={
          props.actived
            ? 'Ícone de adição de funcionário'
            : 'Ícone de adição de funcionário desabilitado'
        }
        isActived={props.actived}
      />
    </div>
  );
};

export default SelectersActions;
