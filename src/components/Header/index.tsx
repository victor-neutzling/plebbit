import React from 'react'

import Button from '../Button'
import styles from './Header.module.scss'

export default function Header() {

  return (
    <div className={styles.header}>
        <div className={styles.logo}>
            <h1 onClick={() => window.location.href='/'}>plebbit</h1>
        </div>
        <div className={styles.links}>
          <div className={styles.buttonWrapper}>
              <Button>login</Button>
          </div>
          <div className={styles.buttonWrapper}>
              <Button onClick={() => window.location.href='/register'}>register</Button>
          </div>
        </div>
    </div>
  )
}
