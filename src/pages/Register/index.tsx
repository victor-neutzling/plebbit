import React, { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import styles from "./Register.module.scss";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className={styles.page}>
            <div className={styles.image}>
                <h1>Join the biggest echo-chamber on the Internet.</h1>
                <img src="img/cat.jpg" alt="" />
            </div>

            <form action="" className={styles.form}>
                <h1>Plebbit</h1>
                <h1>Register. It's free.</h1>
                <label className={styles.label} htmlFor="username">
                    Username
                </label>
                <Input
                    name="username"
                    type="text"
                    required
                    minLength={3}
                    maxLength={20}
                    value={username}
                    setter={setUsername}
                />
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
                    <Button>Submit</Button>
                </div>
            </form>
        </div>
    );
}
