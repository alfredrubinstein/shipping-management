import React from 'react';
import styles from './Home.module.css';

export default function Home() {
  return (
    <>
     <div className={styles.container}>
      <div className={styles.title}>ברוך הבא למערכת חוות היין</div>
      <div className={styles.text}>Created by Alfred Rubinstein</div>
      <div className={styles.text2}>rubinsteinalfred@gmail.com</div>
      {/* <div className={styles.imoji}>🍾</div> */}
     </div>
    </>
  );
}
