import React from 'react'
import styles from './Header.module.scss'

export default function Header() {
  return (
    <div className={styles.header}>
        <div className={styles.logo}>
            <h1>plebbit</h1>
        </div>
        <div className={styles.links}>
            <a className={styles.link}>login</a>
            <a className={styles.link}>register</a>
        </div>
    </div>
  )
}
