import React, { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import Header from "../../components/Header";
import Post from "../../components/Post";
import IComment from "../../common/types/Comment";
import Button from "../../components/Button";
import { Navigate, useNavigate } from "react-router-dom";
import FirebaseConnection from "../../common/utils/Firebase/firebaseConnection";
import { v4 } from "uuid";

export default function Home() {
    let navigate = useNavigate();
    let [posts, setPosts] = useState([]);

    useEffect(() => {
        FirebaseConnection.getPosts().then((result:any) => setPosts(result.reverse()));
    }, []);

    return (
        <div className={styles.home}>
            <Header />
            <div className={styles.offset}>
                <Button
                    color="white"
                    textColor="black"
                    onClick={() => {
                        if (localStorage.getItem("user")) {
                            navigate("/newpost");
                        } else {
                            alert("you need to log in to make a post");
                            navigate("/login");
                        }
                    }}
                >
                    Create Post
                </Button>
            </div>
            {posts.map((post: any) => {
                return (
                    <Post
                        authorEmail={FirebaseConnection.getAuthorByEmail(post.authorEmail)}
                        id={post.id}
                        points={post.points}
                        title={post.title}
                        date={post.date.seconds}
                        content={post.content}
                        comments={[]}
                        key={v4()}
                    />
                );
            })}
        </div>
    );
}
