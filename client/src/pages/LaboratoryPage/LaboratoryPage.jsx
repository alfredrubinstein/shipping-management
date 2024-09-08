import React from 'react';
import LaboratoryForm from '../../components/LaboratoryForm/LaboratoryForm';
import Tabs from '../../components/Tabs/Tabs'
import styles from './LaboratoryPage.module.css';
const LaboratoryPage = () => {
    return (
        <> 
        <div className={styles.container}>
        <Tabs/>     
        <h1 className={styles.title}>
        מערכת מעבדה 🦇
        </h1>
            <LaboratoryForm />
        </div>
        </>
    );
};

export default LaboratoryPage;
