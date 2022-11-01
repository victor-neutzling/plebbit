import React, { useState } from "react";
import Input from "../../components/Input";
import styles from "./Register.module.scss";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>
            <form action="" className={styles.form}>
                <label className={styles.label} htmlFor="username">Username</label>
                <Input
                    name="username"
                    type="text"
                    required
                    minLength={3}
                    maxLength={20}
                    value={username}
                    setter={setUsername}
                />
                <label className={styles.label} htmlFor="email">E-mail</label>
                <Input 
                    name="email"
                    type="email" 
                    required 
                    value={email} 
                    setter={setEmail} 
                />
                <label className={styles.label} htmlFor="password">Password</label>
                <Input
                    name="password"
                    type="password"
                    required
                    minLength={3}
                    maxLength={20}
                    value={password}
                    setter={setPassword}
                />
                <button>submit</button>
            </form>
        </>
    );
}
