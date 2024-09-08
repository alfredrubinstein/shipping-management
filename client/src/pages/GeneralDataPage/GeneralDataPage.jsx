import React from 'react';
import GeneralData from '../../components/GeneralData/GeneralData';
import styles from './GeneralDataPage.module.css';
const GeneralDataPage = () => {
    return (
        <>
        <div className={styles.container}>           
        <h1 className={styles.title}>הודעות</h1>
            <GeneralData />
        </div>
        </>
    );
};

export default GeneralDataPage;
