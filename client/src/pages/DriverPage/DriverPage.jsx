import React from 'react'
import DriverForm from '../../components/DriverForm/DriverForm'
import styles from './DriverPage.module.css'

export default function DriverPage() {
  return (
    <> 
       <div className={styles.container}>
                  <h1 className={styles.title}>מערכת נהגים 🚛</h1>
      <DriverForm/>
    </div>
    </>
  )
}
