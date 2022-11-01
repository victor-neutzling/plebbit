import React, { SetStateAction, useState } from "react";
import styles from "./Input.module.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    value?: string;
    setter: React.Dispatch<SetStateAction<string>>
}

export default function Input({setter, value, ...others }: Props) {

    return (
        <input
            className={styles.input}
            {...others}
            value={value}
            onChange={(e) => setter(e.target.value)}
        />
    );
}
