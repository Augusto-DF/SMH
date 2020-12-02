import React from 'react';
import styles from './Error.module.css';

function switchTypeError(type) {
  switch (type) {
    case 'grave':
      return styles.grave;
      break;

    case 'normal':
      return styles.normal;
      break;
    default:
      break;
  }
}
/**
 # Existem 2 opções de typeError
 #### Grave ( Vermelho )
 #### Normal ( Amarelo )
 */
const Error = (props) => {
  return (
    <span className={switchTypeError(props.typeError)}>{props.value}</span>
  );
};

export default Error;
