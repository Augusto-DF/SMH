import React from 'react';
import styles from './LinstIten.module.css';
import checkImg from './../../../Assets/check.svg';

const LinstIten = (props) => {
  const [visible, setVisible] = React.useState(false);

  async function check() {
    visible ? setVisible(false) : setVisible(true);
    visible
      ? props.setActiveCont(props.activeCont - 1)
      : props.setActiveCont(props.activeCont + 1);
  }

  async function handleClick(e) {
    const index = e.target.dataset.value;
    props.listFunctions[index](props.idTarget);
  }

  return (
    <div className={styles.externWrapper}>
      <div className={styles.block1}>
        <button
          className={
            styles.checkBox +
            ' ' +
            (visible ? styles.visible : styles.invisible)
          }
          onClick={check}
        >
          <img src={checkImg} />
        </button>
        <span onClick={check}>{props.label}</span>
      </div>
      <div className={styles.buttonList}>
        {props.listIcon.map((icon, ii) => {
          return (
            <button key={ii} onClick={handleClick}>
              <img src={icon} alt="" data-value={ii} />
            </button>
          );
        })}
      </div>
      <div className={styles.separator}></div>
    </div>
  );
};

export default LinstIten;
