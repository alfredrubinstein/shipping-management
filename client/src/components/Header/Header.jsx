import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const hamburgerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (open && 
                menuRef.current && 
                !menuRef.current.contains(event.target) &&
                !hamburgerRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    const handleLogoutMobile = () => {
        localStorage.removeItem('token');
        setOpen(false);
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
        {to: '/vineyard', text: 'מערכת כרם'},
        {to: '/director', text: 'מערכת מנהל'},
        {to: '/general', text: 'הודעות'}
    ];

    return (
        <>
            {/* Icono de hamburguesa para móviles */}
            <div 
                className={styles.mobileHeader} 
                onClick={handleOpen}
                ref={hamburgerRef}
            >
                <GiHamburgerMenu />
            </div>

            {/* Menú desplegable para móviles */}
            <div 
                className={`${styles.mobileMenu} ${open ? styles.open : styles.close}`}
                ref={menuRef}
            >
                <ul className={styles.navList}>
                    {linkList.map((link, index) => (
                        <li key={index}>
                            <Link 
                                className={path === link.to ? styles.active : styles.navItem} 
                                to={link.to} 
                                onClick={() => setOpen(false)}
                            >
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
                            <Link 
                                className={path === link.to ? styles.active : styles.navItem} 
                                to={link.to}
                            >
                                {link.text}
                            </Link>
                        </li>
                    ))}
                    <li><button className={styles.logoutButton} onClick={handleLogoutComputer}>Logout</button></li>
                </ul>
            </nav>
        </>
    );
};

export default Header;