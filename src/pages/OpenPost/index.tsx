import React, { FormEvent, FormEventHandler, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "../../components/Comment";
import IPost from "../../common/types/Post";
import FirebaseConnection from "../../common/utils/Firebase/firebaseConnection";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Post from "../../components/Post";
import styles from "./OpenPost.module.scss";
import IComment from "../../common/types/Comment";
import { v4 } from "uuid";

export default function OpenPost() {
    const { id } = useParams();
    const [post, setPost] = useState<IPost | null>(null);
    const [comments, setComments] = useState<Array<any> | null>(null);
    const [commentInputValue, setCommentInputValue] = useState<string>('')
    const [userID, setUserID] = useState<string>('')

    useEffect(()=>{
        FirebaseConnection.getPostByID(id as string).then((res:any) => {
            let postData:IPost = {
                title: res[0].title,
                id: res[0].id,
                authorEmail: res[0].authorEmail,
                comments: [{content: '', id: '', points: 0, user: '', postID: ''}],
                content: res[0].content,
                date: res[0].date,
                points: res[0].points
            }
            setPost(postData)
        }).then(()=>{
            FirebaseConnection.getCommentsByPostID(id as string).then((res:any) => {
                let commentData:IComment[] = res.map((comment:any) => ({
                    id: comment.id,
                    postID: comment.postID,
                    user: comment.authorID,
                    content: comment.content,
                    points: comment.points
                }))
                setComments(commentData);
            })
        })
        FirebaseConnection.getAuthorByEmail(JSON.parse(localStorage.getItem('user') as string).email).then((res:any)=> {
            setUserID(res[0].uid)
        })
    },[id])

    function submitHandler(event:FormEvent<HTMLFormElement>){
        event.preventDefault();

        let commentData:IComment = {
            content: commentInputValue,
            id: v4(),
            points: 1,
            postID: id as string,
            user: userID

        }

        FirebaseConnection.addComment(commentData).then(()=>{window.location.reload()})
    }

    return (
        <div className={styles.openpost}>
            <Header />
            <div className={styles.offset}></div>
            {post? <Post {...post} /> : ''}
            <form className={styles.inputwrapper} onSubmit={submitHandler}>
                <label htmlFor="commentInput">leave a comment</label>
                <textarea onChange={(event) => {setCommentInputValue(event.target.value)}} name="" id="" cols={90} rows={4}></textarea>
                <div className={styles.btnwrapper}>
                    <Button>Submit</Button>
                </div>
            </form>

            {comments?.map(comment => {
                return <Comment id={comment.id} user={comment.user} content={comment.content} points={comment.points} postID={comment.postID} key={v4()}/>
            })}
        </div>
    );
}
