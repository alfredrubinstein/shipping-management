import React from 'react';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import styles from './RegisterPage.module.css';
const RegisterPage = () => {
    return (
        <>
        <div className={styles.container}>
        <h1 className={styles.title}>
        רישום משתמש חדש 👋
        </h1>
            <RegisterForm />
        </div>
        </>
    );
};

export default RegisterPage;
