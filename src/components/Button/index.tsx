import React from 'react'
import styles from './Button.module.scss'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children: string;
    color?: string;
    textColor?: string;
}

export default function Button({textColor, color, children, ...others}:Props) {
  return (
    <button style={{backgroundColor: color || "#0043fc", color: textColor || 'white'}} className={styles.button} {...others}>{children}</button>
  )
}
