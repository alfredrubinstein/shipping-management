import React, { useState, useEffect } from 'react';
import styles from './Director.module.css';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import SearchComponent from '../../components/SearchComponent/SearchComponent';


 const DirectorPage = () => {

  //  const handleAddUser = () => {
//     console.log('add user');
//   }
//   const handleOpenSearch = () => {
//     console.log('open search');
//   }


  return (
    <>
    <div className={styles.container}>
      <h1 className={styles.title}>מערכת מנהל 👮‍♂️</h1>
      {/* <button onClick={handleAddUser}>רשום משתמש חדש</button>
      <button onClick={handleOpenSearch}>חיפוש משלוחים</button>   */}
        <RegisterForm/>
    <SearchComponent/>
      </div>
    </>
  );
};

export default DirectorPage;
