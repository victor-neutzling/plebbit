import React, { useState } from 'react'
import styles from './Login.module.scss'
import Header from '../../components/Header'
import { useNavigate } from 'react-router-dom';
import FirebaseConnection from '../../common/utils/Firebase/firebaseConnection';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleSubmit(event: any) {
        event.preventDefault();
        
        FirebaseConnection.signIn(email, password).then(() => {
            if(localStorage.getItem('user'))
            navigate("/");
        });
    }

  return (
    <>
        <Header />
        <div className={styles.page}>

                <form action="" className={styles.form}>

                    <h1>Login</h1>
                    <label className={styles.label} htmlFor="email">
                        E-mail
                    </label>
                    <Input
                        name="email"
                        type="email"
                        required
                        value={email}
                        setter={setEmail}
                    />
                    <label className={styles.label} htmlFor="password">
                        Password
                    </label>
                    <Input
                        name="password"
                        type="password"
                        required
                        minLength={3}
                        maxLength={20}
                        value={password}
                        setter={setPassword}
                    />
                    <div className={styles.buttonWrapper}>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </div>
                <p>don't have an account? <a onClick={()=>{navigate("/register")}}>register</a></p>
                </form>
            </div>
    </>
  )
}
