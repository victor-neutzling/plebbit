import React, { SetStateAction, useState } from "react";
import styles from "./Input.module.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    value?: string;
    setter: React.Dispatch<SetStateAction<any>>
}

export default function Input({setter, value, ...others }: Props) {
    //tries to validate the event target according to the input type provided
    //there has to be a better way to do that somehow

    return (
        <input
            className={styles.input}
            {...others}
            value={value}
            onChange={(e) => setter(e.target.files ? (e.target.files as FileList)[0] : e.target.value)}
        />
    );
}
