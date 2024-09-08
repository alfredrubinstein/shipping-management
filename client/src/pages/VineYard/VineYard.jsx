import React from 'react'
import VineYardForm from '../../components/VineYardForm/VineYardForm'
import styles from './VineYard.module.css'

export default function VineYard() {
  return (
    <>
    <div className={styles.container}>         
      <h1 className={styles.title}>מערכת כרם 🌄</h1>
      <VineYardForm />
    </div>
    </>
  )
}
