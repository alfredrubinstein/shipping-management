import React, { useState } from 'react';
import styles from './Director.module.css';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import SearchComponent from '../../components/SearchComponent/SearchComponent';

const DirectorPage = () => {
  const [activeComponent, setActiveComponent] = useState(null); // Estado para controlar el componente activo

  const handleShowRegisterForm = () => setActiveComponent('register');
  const handleShowSearchComponent = () => setActiveComponent('search');

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>מערכת מנהל 👮‍♂️</h1>
      <div className={styles.buttonContainer}>
        <button onClick={handleShowSearchComponent} className={styles.button}>
          חיפושים מתקדמים
        </button>
        <button onClick={handleShowRegisterForm} className={styles.button}>
          רישום משתמש
        </button>
        {/* agregar aqui el onClick */}
        <button className={styles.button}>
          שליחת הודאות
        </button>
      </div>

      {activeComponent === 'register' && <RegisterForm />}
      {activeComponent === 'search' && <SearchComponent />}
    
    </div>
  );
};

export default DirectorPage;
