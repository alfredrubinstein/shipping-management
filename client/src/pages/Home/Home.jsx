import React from 'react'
import styles from './Home.module.css'
export default function home() {
  return (
    <>
    <div className={styles.container}>
    <div className={styles.title}>
      ברוך הבא למערכת חוות היין
      </div>
      <div className={styles.text}>המערכת עדיין בפיתוח, תודה על הסבלנות!</div>
      <div className={styles.text2}>השמח לקבל הערות ורעיונות במייל r0527687677@gmail.com</div>


      <div className={styles.imoji}>🍾</div>
      </div>
    </>
  )
}
