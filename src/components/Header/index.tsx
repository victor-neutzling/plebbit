import firebase from 'firebase/compat/app'
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import FirebaseConnection from '../../common/utils/Firebase/firebaseConnection'

import Button from '../Button'
import styles from './Header.module.scss'

export default function Header(auth:any) {
  const [user,setUser] = useState(localStorage.getItem('user'))
  const navigate = useNavigate()

  function handleSignOut(){
    if(window.confirm('are you sure you want to sign out?')){
      FirebaseConnection.signOut().then(
        () =>{
          setUser(localStorage.getItem('user'))
          navigate('/')
        }
      )
    }
  }

  return (
    <div className={styles.header}>
        <div className={styles.logo}>
            <h1 onClick={() => navigate('/')} >plebbit</h1>
        </div>
        <div className={styles.links}>
          {user ? (
            <>
            <div className={styles.userwrapper}>
              {JSON.parse(localStorage.getItem("user")as string).email}
            </div>
              <Button color='red' onClick={handleSignOut}>log out</Button>
            </>

)
          :
           <>
            <div className={styles.buttonWrapper}>
              <Button onClick={() => navigate('/login')}>login</Button>
            </div>
            <div className={styles.buttonWrapper}>
              <Button onClick={() => navigate('/register')} >register</Button>
            </div>
           </>
          }
        </div>
    </div>
  )
}
function setState(currentUser: firebase.User | null): [any, any] {
  throw new Error('Function not implemented.')
}

