import React from 'react'
import styles from './Kashrut.module.css'
import KashrutForm from '../../components/KashrutForm/KashrutForm'

export default function KashrutPage() {
  return (
   <>
    <div className={styles.title}>
      מערבת משגיח  </div>
    <div>
<KashrutForm/>  
    </div>
    </>
  )
}
