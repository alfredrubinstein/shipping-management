import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import styles from './LoginPage.module.css';

const LoginPage = () => {
    return (
        <>
            <h1>כניסה</h1>
        <div className={styles.container}>
            <LoginForm />
        </div>
        </>
    );
};

export default LoginPage;
