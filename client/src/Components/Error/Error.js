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
 # Existem 3 opções de typeError
 #### Grave ( Vermelho )
 #### Normal ( Amarelo )
 */
const Error = (props) => {
  return <p className={switchTypeError(props.typeError)}>{props.value}</p>;
};

export default Error;
