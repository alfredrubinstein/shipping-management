import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className={styles.header}>
            <ul className={styles.navList}>
                <li className={styles.navItem}><Link to="/">בית</Link></li>
                <li className={styles.navItem}><Link to="/entrada">כניסה ליקב</Link></li>
                <li className={styles.navItem}><Link to="/recibimiento">קבלת ענבים</Link></li>
                <li className={styles.navItem}><Link to="/laboratorio">מעבדה</Link></li>
                <li className={styles.navItem}><Link to="/general">הודעות</Link></li>
                <li><button className={styles.logoutButton} onClick={handleLogout}>Logout</button></li>
            </ul>
        </nav>
    );
};

export default Header;
