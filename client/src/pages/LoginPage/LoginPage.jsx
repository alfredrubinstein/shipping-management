import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import styles from './LoginPage.module.css';

const LoginPage = () => {
    return (
        <>
        <div className={styles.container}>
        <h1 className={styles.title}>
            כניסה
        </h1>
            <LoginForm />
        </div>
        </>
    );
};

export default LoginPage;
