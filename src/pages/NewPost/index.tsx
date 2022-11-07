import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { v4 } from 'uuid'
import IComment from '../../common/types/Comment'
import IPost from '../../common/types/Post'
import FirebaseConnection from '../../common/utils/Firebase/firebaseConnection'
import Button from '../../components/Button'
import Header from '../../components/Header'
import Input from '../../components/Input'
import styles from './NewPost.module.scss'

export default function NewPost() {
    const[title,setTitle] = useState('')
    const[image,setImage] = useState(null)
    const[imageURL,setImageURL] = useState('')
    const[post,setPost] = useState<IPost>({} as IPost)
    
    const navigate = useNavigate()

    function uploadImage(event:any){
        event.preventDefault()

        if(image)
        FirebaseConnection.postImage(image,setImageURL).then(()=>{
        })
    }
    
    useEffect(()=>{
        if(!imageURL) return;
        
        FirebaseConnection.createPost({
            authorEmail: JSON.parse(localStorage.getItem('user') as string).email,
            comments: [{}] as IComment[],
            content: imageURL,
            id: v4(),
            date: "", // unnecessary
            points: 1,
            title: title,
        }).then(()=>{
            navigate('/')
        })

    },[imageURL])

  return (
    <div className={styles.newpost}>
        <Header />
        <div className={styles.formwrapper}>
            <h1>create post</h1>
            <form onSubmit={uploadImage} className={styles.form}>
                <label htmlFor="title">title</label>
                <Input type="text" name='title' setter={setTitle}/>
                <label htmlFor="image">image</label>
                <Input type="file" name='image' setter={setImage}/>
                <Button>submit</Button>
            </form>
        
        </div>
    </div>
  )
}
