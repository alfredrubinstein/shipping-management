import React from 'react'
import KashrutForm from '../../components/KashrutForm/KashrutForm'
import Tabs from '../../components/Tabs/Tabs'
import styles from './Kashrut.module.css'

export default function KashrutPage() {
  return (
   <>
    <div className={styles.container}>    
      <Tabs/>       
    <h1 className={styles.title}>מערכת משגיח</h1>
<KashrutForm/>  
    </div>
    </>
  )
}
