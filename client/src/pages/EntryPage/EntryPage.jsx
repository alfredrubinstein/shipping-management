import React from 'react';
import EntryForm from '../../components/EntryForm/EntryForm';
import styles from './EntryPage.module.css';

const EntryPage = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>מערכת כניסה</h1>
            <EntryForm />
        </div>
    );
};

export default EntryPage;
