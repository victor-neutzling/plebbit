import React from "react";
import styles from "./Home.module.scss";
import Header from "../../components/Header";
import Post from "../../components/Post";
import IComment from "../../common/types/Comment";
import Button from "../../components/Button";
import { Navigate, useNavigate } from "react-router-dom";

export default function Home() {
    let navigate = useNavigate();

    return (
        <div className={styles.home}>
            <Header />
            <div className={styles.offset}>
                <Button
                    onClick={() => {
                        if(localStorage.getItem('user')){
                            navigate("/newpost");
                        }else{
                            alert("you need to log in to make a post")
                            navigate("/login")
                        }
                    }}
                >
                    Create Post
                </Button>
            </div>
        </div>
    );
}
