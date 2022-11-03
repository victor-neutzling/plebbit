import React from "react";
import styles from "./Home.module.scss"
import Header from "../../components/Header";
import Post from "../../components/Post";
import IComment from "../../common/types/Comment";

export default function Home() {
  let comment: IComment[] = [{id:"123",user:"brightness3",content:"lorem iposuim",points:123}]

    return (
        <div className={styles.home}>
            <Header />
            <div className={styles.offset}></div>
            <Post id={"123"} points={123} title={"this image"} author={"brightness3"} date={new Date()} content={"https://picsum.photos/200/400"} comments={comment}/>
            <Post id={"123"} points={123} title={"this image"} author={"brightness3"} date={new Date()} content={"https://picsum.photos/300/200"} comments={comment}/>
            <Post id={"123"} points={123} title={"this image"} author={"brightness3"} date={new Date()} content={"https://picsum.photos/700/500"} comments={comment}/>
            <Post id={"123"} points={123} title={"this image"} author={"brightness3"} date={new Date()} content={"https://picsum.photos/600/300"} comments={comment}/>
            <Post id={"123"} points={123} title={"this image"} author={"brightness3"} date={new Date()} content={"https://picsum.photos/300/400"} comments={comment}/>
            <Post id={"123"} points={123} title={"this image"} author={"brightness3"} date={new Date()} content={"https://picsum.photos/200/600"} comments={comment}/>
        </div>
    );
}
