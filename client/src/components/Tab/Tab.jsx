import React from 'react'
import styles from './Tab.module.css'

export default function Tab(props) {
  return (
    <div className={styles.TabContainer}>
      {props.time}
    </div>
  )
}
