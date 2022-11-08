import React, { useEffect, useState } from "react";
import IComment from "../../common/types/Comment";
import FirebaseConnection from "../../common/utils/Firebase/firebaseConnection";
import Button from "../Button";
import styles from "./Comment.module.scss";

export default function Comment(props:IComment) {
    const[authorName, setAuthorName] = useState('')

    useEffect(()=>{
      
        FirebaseConnection.getUserByID(props.user).then((res:any)=>{
            setAuthorName(res[0].name)
        })
    },[])

    return (
        <div className={styles.comment}>
            <div className={styles.sidebar}>
                <Button color="green">uv</Button>
                {props.points}
                <Button color="red">dv</Button>
            </div>
            <div className={styles.maincontent}>
                <div className={styles.commentinfo}>
                    <h2 className={styles.username}>{authorName} says...</h2>
                </div>
                <div className={styles.commentbody}>
                    <p>{props.content}</p>
                </div>
            </div>
        </div>
    );
}
