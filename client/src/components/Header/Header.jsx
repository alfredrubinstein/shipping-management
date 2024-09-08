import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleLogoutMobile = () => {
        localStorage.removeItem('token');
        setOpen(!open);
        navigate('/login');
    };
    const handleLogoutComputer = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleOpen = () => {
        setOpen(!open);
    };

    const path = window.location.pathname;

    const linkList = [
        {to: '/', text: 'בית'},
        {to: '/entrada', text: 'כניסה ליקב'},
        {to: '/recibimiento', text: 'קבלת ענבים'},
        {to: '/laboratorio', text: 'מעבדה'},
        {to: '/driver', text: 'מערכת נהגים'},
        {to: '/vineyard', text: 'מערכת כרם'},
        {to: '/director', text: 'מערכת מנהל'},
        {to: '/kashrut', text: 'כשרות'},
        {to: '/general', text: 'הודעות'}
    ];

    return (
        <>
            {/* Icono de hamburguesa para móviles */}
            <div className={styles.mobileHeader} onClick={handleOpen}>
                <GiHamburgerMenu />
            </div>

            {/* Menú desplegable para móviles */}
            <div className={`${styles.mobileMenu} ${open ? styles.open : styles.close}`}>
                <ul className={styles.navList}>
                    {linkList.map((link, index) => (
                        <li key={index}>
                            <Link className={path === link.to ? styles.active : styles.navItem} to={link.to} onClick={handleOpen}>
                                {link.text}
                            </Link>
                        </li>
                    ))}
                    <li><button className={styles.logoutButton} onClick={handleLogoutMobile}>Logout</button></li>
                </ul>
            </div>

            {/* Menú para computadoras */}
            <nav className={styles.computerHeader}>
                <ul className={styles.navList}>
                    {linkList.map((link, index) => (
                        <li key={index}>
                            <Link className={path === link.to ? styles.active : styles.navItem} to={link.to}>
                                {link.text}
                            </Link>
                            {/* <div className={styles.separador}>aaa</div> */}
                        </li>
                    ))}
                    <li><button className={styles.logoutButton} onClick={handleLogoutComputer}>Logout</button></li>
                </ul>
            </nav>
        </>
    );
};

export default Header;
