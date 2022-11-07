import React, { useEffect, useState } from "react";
import { isPropertyAccessExpression } from "typescript";
import IPost from "../../common/types/Post";
import Button from "../Button";
import styles from "./Post.module.scss";

export default function Post(props: IPost) {
    const[authorName, setAuthorName] = useState('')
    
    useEffect(()=>{
        if(typeof props.authorEmail == "string"){
            setAuthorName(props.authorEmail)
        }else{
            props.authorEmail.then(x => setAuthorName(x[0].name))
        }
        console.log(props.content)
    },[])

    return (
        <div className={styles.post}>
            <div className={styles.sidebar}>
                <Button color="green">uv</Button>
                {props.points}
                <Button color="red">dv</Button>
                {/* points, up and downvote btn goes here */}
            </div>
            <div className={styles.maincontent}>
                <div className={styles.postinfo}>
                    <h2 className={styles.username}>by: {authorName }</h2>
                    <h2 className={styles.postdate}>created: {props.date}</h2>
                </div>
                <div className={styles.titleWrapper}>
                    <h1>{props.title}</h1>
                </div>
                <div className={styles.postbody}>
                    <img src={props.content} alt={props.title} />
                </div>
                <div className={styles.footer}>
                    <Button>{props.comments.length + " " + "comments"}</Button>
                    {/* comments and stuff goes here */}
                </div>
            </div>
        </div>
    );
}
