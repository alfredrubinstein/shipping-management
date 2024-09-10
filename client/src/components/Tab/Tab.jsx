import React from 'react';
import styles from './Tab.module.css';
import { CiCircleRemove } from "react-icons/ci";
import useArrayStore from '../../store';

export default function Tab(props) {
  const { removeElement } = useArrayStore((state) => ({
    removeElement: state.removeElement
  }));

  const handleRemove = () => {
    removeElement(props.shipment); 
  }

  const handleSeleccion = () => {
    console.log('shipment:', props.shipment);
  }

  return (
     <>
    <div className={styles.TabContainer} onClick={handleSeleccion}>
     <div className={styles.remove} onClick={handleRemove}>
        <CiCircleRemove />
      </div>
      {props.shipment} - {props.time}
    </div>
    </>
  );
}
