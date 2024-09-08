import React from 'react';
import GrapeReceptionForm from '../../components/GrapeReceptionForm/GrapeReceptionForm';
import Tabs from '../../components/Tabs/Tabs'
import styles from './GrapeReceptionPage.module.css';

const GrapeReceptionPage = ({addNewTime}) => {
    // const {addNewTime}=props;
    return (
        <>
        <div className={styles.container}>            
        <Tabs/>
        <h1 className={styles.title}>מערכת קבלת ענבים 🍇</h1>
            <GrapeReceptionForm onClick={addNewTime} />
        </div>
        </>
    );
};

export default GrapeReceptionPage;