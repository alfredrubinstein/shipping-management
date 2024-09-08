import React from 'react';
import styles from './Tab.module.css';
import { CiCircleRemove } from "react-icons/ci";
import useArrayStore from '../../store';

export default function Tab(props) {
  const { removeElement } = useArrayStore((state) => ({
    removeElement: state.removeElement
  }));

  const handleOnClick = () => {
    removeElement(props.shipment); 
  }

  return (
     <>
    <div className={styles.TabContainer}>
     <div className={styles.remove} onClick={handleOnClick}>
        <CiCircleRemove />
      </div>
      {props.shipment} - {props.time}
    </div>
    </>
  );
}
