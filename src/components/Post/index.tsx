import React from "react";
import { isPropertyAccessExpression } from "typescript";
import IPost from "../../common/types/Post";
import Button from "../Button";
import styles from "./Post.module.scss";

export default function Post(props: IPost) {
    
    
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
                    <h2 className={styles.username}>by: {props.author}</h2>
                    <h2 className={styles.postdate}>created: {props.date.getDate()}</h2>
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
