import React from 'react';
import SelectModal from '../UI/Modals/SelectModal';
import styles from './AdminMenu.module.css';
const AdminMenu = () => {
  return (
    <ul className={styles.mainMenu}>
      <li>
        <SelectModal nameAnchor="Novo Agendamento" anchorPath="newMark" />
      </li>
      <li>
        <SelectModal nameAnchor="Calendário" anchorPath="calendar" />
      </li>
      <li>
        <SelectModal
          nameAnchor="Editar"
          options={[
            { op: 'Editar Serviços', path: '/' },
            { op: 'Editar Funcionários', path: 'editFuncionary' },
            { op: 'Editar Clientes', path: '/' },
          ]}
        />
      </li>
      <li>
        <SelectModal
          nameAnchor="Dados Do Estabelecimento"
          options={[
            { op: 'Dados Gerais', path: '/' },
            { op: 'Horário de Funcionamento', path: '/' },
            { op: 'Configurações de Lembrete', path: '/' },
          ]}
        />
      </li>
      <li>
        <SelectModal
          nameAnchor="Meus Dados Pessoais"
          options={[
            { op: 'Dados Gerais', path: '/' },
            { op: 'Alterar Senha', path: '/' },
          ]}
        />
      </li>
    </ul>
  );
};

export default AdminMenu;
