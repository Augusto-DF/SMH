import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SelectModal.module.css';

const SelectModal = (props) => {
  const [ulClass, setUlClass] = React.useState(styles.hide);
  const [bgColor, setBgColor] = React.useState('');
  const [fontColor, setFontColor] = React.useState('');

  function handleMouseEnter() {
    setUlClass(props.ulClassName);
    setBgColor('#25292f');
    setFontColor('#f4f5fa');
  }

  function handleMouseLeave() {
    setUlClass(styles.hide);
    setBgColor('');
    setFontColor('');
  }
  return (
    <div onMouseLeave={handleMouseLeave} className={styles.selectModal}>
      <div className={styles.anchor} style={{ backgroundColor: bgColor }}>
        <Link
          style={{ color: fontColor }}
          to={!props.anchorPath ? '' : props.anchorPath}
          onMouseEnter={handleMouseEnter}
        >
          {props.nameAnchor}
        </Link>
      </div>
      <ul className={styles.list + ' ' + ulClass}>
        {props.options &&
          props.options.map((op, count) => (
            <li key={count} className={styles.liOptions}>
              {op.path !== '' ? <Link to={op.path}>{op.op}</Link> : op.op}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SelectModal;
